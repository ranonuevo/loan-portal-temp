'use client'

import Header from '@/components/ui/Header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalConfirm } from '@/hooks/confirm'
import { toast } from 'sonner'
import { ChevronRight } from 'lucide-react'
import { formSchema, defaultValues, formConfig } from './config'
import { FieldRenderer } from '@/components/forms'
import { uploadFileToOpus, runJob, getJobResult } from '@/lib/opus'
import { useState } from 'react'
import Link from 'next/link'
import Papa from 'papaparse'
import { flattenObject } from "@/lib/utils";

export default function DemoOpusPage() {
  const router = useRouter()
  const modalConfirm = useModalConfirm()
  const [csvLink, setCsvLink] = useState<string | null>(null);
  const [jobLink, setJobLink] = useState('')
  const hookForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    defaultValues
  })

  const { handleSubmit, setValue } = hookForm

  const updateJobLink = (id: string) => {
    setJobLink(`https://app.opus.com/app/job/${id}`)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values.academicReportFiles[0])
    // return

    modalConfirm({
      title: 'Submit details',
      description: 'This will submit your details. Continue?',
    })
      .then(async () => {
        setValue('isDisableFields', true);
        toast.loading('Uploading file...', { id: 'opus' });

        try {
          // 1️⃣ Upload the file
          const uploadedAcademicUrls = [];
          const uploadedEmailRecordUrl = null;
          
          for (const file of values.academicReportFiles) {
            const url = await uploadFileToOpus(file);
            uploadedAcademicUrls.push(url);
          }

          let uploadedEmailUrl = null;
          if (values.emailRecords?.[0]) {
            uploadedEmailUrl = await uploadFileToOpus(values.emailRecords[0]);
          }


          // 2️⃣ Start job
          toast.info('Workflow started...', { id: 'opus' });
          const runJobRes: any = await runJob(
            '896CqwWLoLeD8Loo',
            'Upload multiple Academic Report Files',
            'Upload multiple Academic Report Files and extracts data',
            {
              workflow_input_n6r0h8trn: { display_name: "Academic Report Files", value: uploadedAcademicUrls, type: "array_files" },
              workflow_input_10n01sr8g: { display_name: "Email Records File", value: uploadedEmailUrl, type: "file" },
              workflow_input_48fzoukai: { display_name: "Recipient Email Address", value: values.recipientEmail, type: "str" },
            }
          );
          const { jobExecutionId } = await runJobRes.json()
          updateJobLink(jobExecutionId)

          // 4️⃣ Poll result
          toast.loading('Waiting for result...', { id: 'opus' });
          let result;
          for (let i = 0; i < 100; i++) {
            result = await getJobResult(jobExecutionId);
            
            if (result?.statusCode === 202) {
              await new Promise((r) => setTimeout(r, 2000));
              continue;
            }

            if (result?.jobResultsPayloadSchema) {
              const raw = result.jobResultsPayloadSchema?.workflow_output_re3nyhd9f?.value ?? [];

              if (raw.length > 0) {
                // Flatten each record
                const flattened = raw.map((r: any) => flattenObject(r));

                const csvContent = Papa.unparse(flattened);
                const blob = new Blob([csvContent], { type: "text/csv" });
                const url = URL.createObjectURL(blob);

                setCsvLink(url); // store it in state
                toast.success("CSV is ready for download!", { id: "opus" });
              } else {
                toast.error("No extracted entries found.", { id: "opus" });
              }


              break; // STOP POLLING
            }

            await new Promise((r) => setTimeout(r, 2000));
          }

          toast.success('Workflow completed!', { id: 'opus' });
        } catch (err: any) {
          console.error(err);
          toast.error(`Error: ${err.message}`, { id: 'opus' });
        } finally {
          setValue('isDisableFields', false);
        }
      })
      .catch(() => {});
  };

  const displayInput = (name: string, fieldArrayName: string | null = null) => {
    return (
      <FieldRenderer
        name={name}
        fieldArrayName={fieldArrayName}
        fieldsConfig={formConfig}
        hookForm={hookForm}
      />
    )
  }

  const hookMethods = {
    ...hookForm,
    displayInput
  }

  return (
    <div className="min-h-screen bg-white">
      <Header backHref="/demo-opus" backLabel="Back" title="" />

      <div className="px-6 py-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Demo Opus - Student Academic Reports</h1>
          <p className="text-gray-500 text-sm mb-6">Please fill the details below.</p>

          <FormProvider {...hookMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {displayInput('academicReportFiles')}
              {displayInput('emailRecords')}
              {displayInput('recipientEmail')}

              {jobLink && (
                <div>
                  <Link href={jobLink} target='_blank' className='underline text-primary'>
                    Go to { jobLink }
                  </Link>
                </div>
              )}

              {csvLink && (
                <div className="mt-4">
                  <a
                    href={csvLink}
                    download="opus-output.csv"
                    className="text-primary underline"
                  >
                    Download CSV Output
                  </a>
                </div>
              )}


              <div className="flex justify-end pt-6">
                <Button
                  disabled={hookForm.watch('isDisableFields')}
                  type="submit"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}
