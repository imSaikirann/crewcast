
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormPreview } from "./FormPreview";

import { HugeIcon } from "@/utils/hugeicons";
import { FieldType } from "../types/types";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";


export default function FormBuilderPanel({  formTitle, formDescription, setFormTitle, setFormDescription, fields, setFields, selectedFieldType, setSelectedFieldType, handleAddField, handleUpdateField, handleRemoveField, handleAddOption, handleRemoveOption }: {
  formTitle: string;
  formDescription: string;
  setFormTitle: (title: string) => void;
  setFormDescription: (description: string) => void;
  fields: any[];
  setFields: (fields: any[]) => void;
  selectedFieldType: string;
  setSelectedFieldType: (type: string) => void;
  handleAddField: () => void;
  handleUpdateField: (id: string, updates: any) => void;
  handleRemoveField: (id: string) => void;
  handleAddOption: (id: string, option: string) => void;
  handleRemoveOption: (id: string, index: number) => void;
}) {

    // Memoized field types for select dropdown
      const fieldTypes = useMemo(
        () => [
          { value: "text", label: "Text Input" },
          { value: "email", label: "Email" },
          { value: "number", label: "Number" },
          { value: "textarea", label: "Textarea" },
          { value: "select", label: "Select Dropdown" },
          { value: "checkbox", label: "Checkbox" },
          { value: "date", label: "Date" },
          { value: "file", label: "File Upload" },
        ],
        []
      );

  return (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Builder Panel */}
          <div className="space-y-6">
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
                  <Label htmlFor="form-description">Description</Label>
                  <Textarea
                    id="form-description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe the purpose of this form..."
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Field</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Field Type</Label>
                  <Select
                    value={selectedFieldType}
                    onValueChange={(value) => setSelectedFieldType(value as FieldType)}
                  >
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fieldTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddField} className="w-full" variant="outline">
                  <HugeIcon name="add-circle" className="w-4 h-4 mr-2" />
                  Add Field
                </Button>
              </CardContent>
            </Card>

            {/* Fields List */}
            {/* {fields.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Form Fields ({fields.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map((field) => (
                    <FieldEditor
                      key={field.id}
                      field={field}
                      onUpdate={(updates) => handleUpdateField(field.id, updates)}
                      onRemove={() => handleRemoveField(field.id)}
                      onAddOption={(option) => handleAddOption(field.id, option)}
                      onRemoveOption={(index) => handleRemoveOption(field.id, index)}
                    />
                  ))}
                </CardContent>
              </Card>
            )} */}
          </div>

          {/* Form Preview Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <FormPreview
                  title={formTitle || "Untitled Form"}
                  description={formDescription}
                  fields={fields}
                />
              </CardContent>
            </Card>
          </div>
        </div>
  )
}
