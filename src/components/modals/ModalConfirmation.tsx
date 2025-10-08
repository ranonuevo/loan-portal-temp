'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type Config = {
  title: string,
  description: string
  buttonConfirmLabel?: string
  buttonConfirmVariant?: any
  showCancelBtn?: boolean
}

type ModalConfirmationProps = {
  params: Config
  isOpen: boolean
  handleClose?: () => void
  handleConfirm?: () => void
}

const ModalConfirmation = ({
  params,
  isOpen = false,
  handleClose,
  handleConfirm
}: ModalConfirmationProps) => {
  const config = {
    ...params,
    showCancelBtn: params?.showCancelBtn === undefined? true : params.showCancelBtn
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ config.title }</AlertDialogTitle>
          <AlertDialogDescription>
            { config?.description }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            {
              config?.showCancelBtn? (
                <Button variant='outline' size="default" onClick={handleClose}>Cancel</Button>
              ) : <span />
            }
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button 
              variant={config?.buttonConfirmVariant || 'marhaba'}
              size="default"
              onClick={handleConfirm}
            >
              { config?.buttonConfirmLabel || 'Confirm'}
            </Button> 
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalConfirmation


