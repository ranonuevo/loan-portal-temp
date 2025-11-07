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
          const file = values.hkidImage[0];
          const fileUrl = await uploadFileToOpus(file);

          // 2️⃣ Start job
          toast.info('Workflow started...', { id: 'opus' });
          const runJobRes: any = await runJob(
            'PNRJPVlR3e8KrLnH',
            'HKID Verification',
            'Verifies HKID and extracts data',
            {
              workflow_input_sxrvlbmci: { display_name: "Name", value: values.name, type: "str" },
              workflow_input_ozgbyqxhw: { display_name: "HKID Number", value: values.hkid, type: "str" },
              workflow_input_t8r8kh4oz: { display_name: "Date of Birth", value: values.dateOfBirth, type: "str" },
              hkid_image: { display_name: "HKID Image", value: fileUrl, type: "file" },
              workflow_input_gq3ljz4w5: { display_name: "Recipient Email Address", value: values.recipientEmail, type: "str" },
            }
          );
          const { jobExecutionId } = await runJobRes.json()
          updateJobLink(jobExecutionId)

          

          // // 4️⃣ Poll result
          // toast.loading('Waiting for result...', { id: 'opus' });
          // let result;
          // for (let i = 0; i < 10; i++) {
          //   result = await getJobResult(jobInit.jobExecutionId);
          //   if (result.status === 'Completed') break;
          //   await new Promise((r) => setTimeout(r, 2000));
          // }

          // toast.success('Workflow completed!', { id: 'opus' });
          // console.log('Result:', result);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Demo Opus</h1>
          <p className="text-gray-500 text-sm mb-6">Please fill the details below.</p>

          <FormProvider {...hookMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {displayInput('name')}
              {displayInput('hkid')}
              {displayInput('dateOfBirth')}
              {displayInput('hkidImage')}
              {displayInput('recipientEmail')}

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
