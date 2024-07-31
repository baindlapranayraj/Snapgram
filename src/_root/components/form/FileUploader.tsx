import { ImageDown } from 'lucide-react'
import  {useCallback, useState} from 'react'
import {useDropzone,FileWithPath} from 'react-dropzone'
import { Button } from '../../../_auth/import/ImportShad'

type FielPropsType = {
  fieldChange:(files:File[])=>void
  mediaUrl:string
}

const FileUploader = ({fieldChange,mediaUrl}:FielPropsType) => {

  const [fileUrl,setFileUrl] = useState('')
  const [file,setFile] = useState<File[]>([])

  function MyDropzone() {
    const onDrop = useCallback(
      (acceptedFiles:FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fieldChange(acceptedFiles)
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [])
    const {getRootProps, getInputProps} = useDropzone({
      onDrop,
      accept:{
        'image/*':['.png','.jpeg','.jpg','.svg']
      }
    })
  
    return (
      <div {...getRootProps()} className='flex flex-col cursor-pointer bg-zinc-900 rounded-xl items-center justify-center'>
        <input {...getInputProps()} />
        {
          fileUrl ?
            (
            <div className='h-32 w-96 p-4'>
              <img src={fileUrl} className='rounded-xl w-full h-full object-cover' alt="" />
            </div>
          ) :
            (
            <div className='h-32 w-32 flex flex-col items-center justify-center gap-2'>
              <ImageDown strokeWidth={1} width={35} height={35}  className='ext-gray-600' />
              <h1 className='text-gray-600 text-xs'>JPG,SVG,PNG</h1>
              <Button className='bg-stone-800 text-xs hover:bg-stone-900'>Select from computer</Button>
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div>
      <MyDropzone/>
    </div>
  )
}

export default FileUploader