# Toast Notification System

A global toast/notification system built on top of Sonner for consistent user feedback across the application.

## File Structure

```
src/lib/toast/
├── index.ts       # Main exports
├── toast.ts       # Toast utility functions
├── types.ts       # TypeScript types
└── README.md      # Documentation

src/hooks/
└── useToast.ts    # React hook for toast notifications
```

## Usage

### Basic Usage

```tsx
import { toast } from "@/lib/toast";

// Success notification
toast.success("Form saved successfully!");

// Error notification
toast.error("Something went wrong", {
  description: "Please try again later."
});

// Warning notification
toast.warning("Please review your input");

// Info notification
toast.info("New feature available!");
```

### Using the Hook

```tsx
import { useToast } from "@/hooks/useToast";

function MyComponent() {
  const { toast } = useToast();

  const handleSave = () => {
    toast.success("Saved!");
  };

  return <button onClick={handleSave}>Save</button>;
}
```

### Promise-based Toasts

```tsx
import { toast } from "@/lib/toast";

const handleSubmit = async () => {
  await toast.promise(
    apiCall(),
    {
      loading: "Saving form...",
      success: "Form saved successfully!",
      error: (err) => `Failed to save: ${err.message}`
    }
  );
};
```

### Loading States

```tsx
import { toast } from "@/lib/toast";

const toastId = toast.loading("Processing...");

// Later, dismiss it
toast.dismiss(toastId);
```

## API Reference

### `toast.success(message, options?)`
Shows a success notification.

### `toast.error(message, options?)`
Shows an error notification.

### `toast.warning(message, options?)`
Shows a warning notification.

### `toast.info(message, options?)`
Shows an info notification.

### `toast.loading(message, options?)`
Shows a loading notification. Returns a toast ID.

### `toast.promise(promise, options)`
Shows loading, then success/error based on promise result.

### `toast.dismiss(toastId?)`
Dismisses a specific toast or all toasts.

### `toast.dismissAll()`
Dismisses all active toasts.

## Configuration

The Toaster component is configured in `src/app/providers.tsx` with:
- Position: top-right
- Rich colors enabled
- Close button enabled
- Expand on hover
- Default duration: 4000ms

## Best Practices

1. **Use descriptive messages**: Be clear about what happened
2. **Add descriptions for errors**: Help users understand what went wrong
3. **Use promise toasts for async operations**: Better UX for API calls
4. **Don't overuse**: Too many toasts can be annoying
5. **Keep messages concise**: Short and to the point

