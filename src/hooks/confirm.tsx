'use client'

import React, { useState, useRef, useContext, createContext } from 'react'
import ModalConfirmation from '@/components/modals/ModalConfirmation'

type Params = Record<string, unknown>
type ConfirmContextProps = (params: Params) => Promise<unknown>
type ConfirmServiceProviderProps = {
  children: React.ReactNode
}

const ConfirmContext = createContext<ConfirmContextProps | undefined>(undefined)

export const ConfirmServiceProvider = ({ children }: ConfirmServiceProviderProps) => {
  const [params, setParams] = useState<Params | null>(null)
  const awaitingPromiseRef = useRef<{ resolve: (value: unknown) => void; reject: (reason?: unknown) => void } | null>(null)

  const openModal = (p: Params) => {
    setParams(p)
    return new Promise<unknown>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject }
    })
  }

  const handleClose = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject('close')
    }
    setParams(null)
  }

  const handleConfirm = (data: unknown = null) => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve(data)
    }
    setParams(null)
  }

  const renderModal = () => {
    return (
      <ModalConfirmation 
        params={params as unknown as { title: string; description: string; buttonConfirmLabel?: string; buttonConfirmVariant?: import("@/components/ui/button").ButtonProps["variant"]; showCancelBtn?: boolean }}
        isOpen={!!(params && Object.entries(params).length)} 
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />
    )
  }
  
  return (
    <>
      <ConfirmContext.Provider value={openModal}>
        {children}
      </ConfirmContext.Provider>

      { renderModal() }
    </>
  )
}

export const useModalConfirm = () => {
  const context = useContext(ConfirmContext)

  if (!context) {
    throw new Error('useModalConfirm must be used within ConfirmServiceProvider')
  }

  return context
}


