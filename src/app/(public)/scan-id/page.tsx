'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ScanIDPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const handleContinue = () => {
    router.push('/personal-details'); // Navigate to the next step
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Scan Your ID</h1>
        <p className="text-gray-600 mb-6">
          Please place your EID or Employee ID card within the frame
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className={`aspect-video relative bg-gray-100 rounded-lg overflow-hidden mb-6 ${isScanning ? 'border-4 border-primary' : ''}`}>
          {!scanComplete ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isScanning ? (
                <>
                  <div className="w-full max-w-sm h-48 border-2 border-primary relative animate-pulse">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-scan"></div>
                  </div>
                  <p className="text-primary mt-4">Scanning...</p>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <Button onClick={handleStartScan} className="bg-primary hover:bg-primary/90">
                    Start Scanning
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50">
              <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-600 font-semibold mb-4">Scan Complete!</p>
              <Button onClick={handleContinue} className="bg-primary hover:bg-primary/90">
                Continue
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Make sure your ID card is well-lit and clearly visible</p>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Keep your ID card steady within the frame</p>
          </div>
        </div>
      </div>
    </div>
  );
}