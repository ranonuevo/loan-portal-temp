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
import { downloadCSV } from "@/lib/csv";

export default function DemoOpusPage() {
  const router = useRouter()
  const modalConfirm = useModalConfirm()


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
    // console.log(values.hkidImage[0])
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
          const uploadedUrls = [];

          for (const file of values.hkidImage) {
            const url = await uploadFileToOpus(file);
            uploadedUrls.push(url);
          }

          // 2️⃣ Start job
          toast.info('Workflow started...', { id: 'opus' });
          const runJobRes: any = await runJob(
            'bQQj72mwLWzKE1xg',
            'Upload multiple HKID Images',
            'Upload multiple HKID Images and extracts data',
            {
              hong_kong_id_files: { display_name: "HKID Images", value: uploadedUrls, type: "array_files" },
              // workflow_input_gq3ljz4w5: { display_name: "Recipient Email Address", value: values.recipientEmail, type: "str" },
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

            if (result?.jobResultsPayloadSchema?.compiled_hk_id_json) {
              const records =
                result.jobResultsPayloadSchema.compiled_hk_id_json.value ?? [];

              if (records.length > 0) {
                downloadCSV(records, "opus-output.csv");
                toast.success("CSV Exported!", { id: "opus" });
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
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Demo Opus - Multi Upload</h1>
          <p className="text-gray-500 text-sm mb-6">Please fill the details below.</p>

          <FormProvider {...hookMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {displayInput('hkidImage')}
              {/* {displayInput('recipientEmail')} */}

              {jobLink && (
                <div>
                  <Link href={jobLink} target='_blank' className='underline text-primary'>
                    Go to { jobLink }
                  </Link>
                </div>
              )}

              <div className="flex justify-end pt-6">
                <Button
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
