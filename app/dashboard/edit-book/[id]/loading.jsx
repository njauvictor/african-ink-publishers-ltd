import { Spinner } from '@/components/client/Spinner'
import React from 'react'

function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
    <Spinner/>
    </div>
  )
}

export default loading