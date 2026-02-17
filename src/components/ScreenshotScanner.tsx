import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, X, FileImage, Scan, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ScreenshotScannerProps {
  onScanComplete: (text: string) => void;
  scannedText: string;
}

export function ScreenshotScanner({ onScanComplete, scannedText }: ScreenshotScannerProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showExtractedText, setShowExtractedText] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      // Mock extracted text with common Jira ticket elements
      const mockExtractedText = `
IPT Rec Modal - Fix Close Button Issue

Type: Bug
Priority: High
Assignee: John Smith
Labels: IPT, Frontend, Modal, Bug-Fix

Description:
As a user of the IPT Rec Modal, I want the close button to properly dismiss the modal so that I can exit without issues.

Current Behavior:
Currently, when users click the close button (X) in the top-right corner of the IPT Rec Modal, the modal does not close properly. The overlay remains and the page becomes unresponsive.

Expected Behavior:
When the close button is clicked, the modal should close immediately and return focus to the underlying page. The modal should also close when clicking outside the modal area or pressing the ESC key.

Technical Details:
- Component: src/components/modals/IPTRecModal.tsx
- Related API: /api/ipt/recommendations
- Environment: Staging and Production
- Browser: Chrome 120, Safari 17

Acceptance Criteria:
1. Given the IPT Rec Modal is open, when the user clicks the X button, then the modal closes
2. Given the IPT Rec Modal is open, when the user clicks outside the modal, then the modal closes
3. Given the IPT Rec Modal is open, when the user presses ESC key, then the modal closes
4. Verify all data validation occurs before modal dismissal
5. Handle edge cases where data is being saved

Steps to Reproduce:
1. Navigate to IPT dashboard
2. Click "View Recommendations"
3. IPT Rec Modal opens
4. Click the X button in top-right corner
5. Observe: Modal does not close

Attached: screenshot-modal-issue.png

Testing Requirements:
- Test on Chrome, Safari, and Firefox
- Test on Desktop and Mobile devices
- Verify keyboard navigation works correctly
- Ensure screen reader announces modal state changes
- Test responsive design on tablet breakpoints
- Regression test: verify modal opens correctly with data
      `.trim();

      onScanComplete(mockExtractedText);
      setIsScanning(false);
      setShowExtractedText(true);
    }, 2000);
  };

  const handleClear = () => {
    setImage(null);
    setShowExtractedText(false);
    onScanComplete("");
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Scan className="size-5 text-blue-600" />
        <h2 className="text-slate-900">Screenshot Scanner</h2>
      </div>

      {!image ? (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            id="screenshot-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="screenshot-upload"
            className="cursor-pointer flex flex-col items-center gap-3"
          >
            <div className="bg-blue-50 p-4 rounded-full">
              <Upload className="size-8 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-900 mb-1">
                Upload a screenshot of your Jira ticket
              </p>
              <p className="text-slate-500">
                PNG, JPG up to 10MB
              </p>
            </div>
            <Button type="button">Choose File</Button>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <ImageWithFallback
              src={image}
              alt="Uploaded screenshot"
              className="w-full rounded-lg border border-slate-200 max-h-96 object-contain bg-slate-50"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleClear}
            >
              <X className="size-4" />
            </Button>
          </div>

          {!scannedText ? (
            <Button onClick={handleScan} disabled={isScanning} className="w-full">
              {isScanning ? (
                <>
                  <Scan className="size-4 mr-2 animate-pulse" />
                  Scanning image...
                </>
              ) : (
                <>
                  <Scan className="size-4 mr-2" />
                  Scan & Analyze Ticket
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="size-5" />
                <span>Scan complete! Checklist updated automatically.</span>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowExtractedText(!showExtractedText)}
                className="w-full"
              >
                <FileImage className="size-4 mr-2" />
                {showExtractedText ? "Hide" : "View"} Extracted Text
              </Button>

              {showExtractedText && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                  <p className="text-slate-600 mb-2">Extracted text from image:</p>
                  <pre className="text-slate-800 whitespace-pre-wrap">
                    {scannedText}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-900">
          💡 <strong>Tip:</strong> The scanner uses OCR to extract text from your screenshot
          and automatically checks items based on detected keywords. Review and adjust
          manually as needed.
        </p>
      </div>
    </Card>
  );
}
