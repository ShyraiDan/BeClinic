import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ErrorText } from '@/components/ui/errorText'
import { Label } from '@/components/ui/label'

export default function Home() {
  return (
    <>
      <Button>Button</Button>
      <div className='mt-4'>
        <Label>Label</Label>
        <Input />
        <ErrorText>Error</ErrorText>
      </div>
    </>
  )
}
