import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/goal')({
  component: () => <div>Hello /_auth/goal!</div>,
})
