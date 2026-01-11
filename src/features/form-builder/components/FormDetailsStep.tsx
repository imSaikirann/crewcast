"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FormDetailsStepProps {
  formTitle: string
  formDescription: string
  expiresAt: string
  setFormTitle: (title: string) => void
  setFormDescription: (description: string) => void
  setExpiresAt: (date: string) => void
}

export function FormDetailsStep({
  formTitle,
  formDescription,
  expiresAt,
  setFormTitle,
  setFormDescription,
  setExpiresAt,
}: FormDetailsStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="form-title">Form Title *</Label>
          <Input
            id="form-title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="e.g., Job Application Form"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="form-description">Description *</Label>
          <Textarea
            id="form-description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Describe the purpose of this form..."
            className="mt-1"
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="expires-at">Expires At</Label>
          <Input
            id="expires-at"
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  )
}

