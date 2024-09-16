import { Button, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from '@nextui-org/react'
import clsx from 'clsx'
import { FaPaperclip } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { MediaService } from 'src/shared/api'
import * as yup from "yup"
import { Comment } from 'src/entities/appeal/model'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useKeycloak } from '@react-keycloak/web'
import { useAppealsStore } from 'src/store/appeals'

import { send } from 'src/entities/appeal/libs/send'

type Props = {
    id: string
    number: number
    comments: Comment[]
    isOpen: boolean
    onOpenChange: () => void
}

type Inputs = {
    body: string
    files: File[]
}

const schema = yup
    .object({
        body: yup.string().required(''),
        files: yup.mixed()
    })
    .required()

const AppealChat: React.FC<Props> = props => {

    const {
        register,
        reset,
        handleSubmit,
    } = useForm<Inputs>({
        // @ts-expect-error
        resolver: yupResolver<Inputs>(schema)
    })

    const {updateData} = useAppealsStore()

    const {keycloak} = useKeycloak()
    const inputRef = useRef<HTMLInputElement>(null)
    const onSubmit: SubmitHandler<Inputs> = (data) => send(props.id, data, keycloak.token, updateData, reset)
    

    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    <h2>Чат обращения №{props.number}</h2>
                </ModalHeader>
                <ModalBody>
                    <div className='w-full h-[500px] overflow-y-auto bg-gray-100 p-4 rounded-md flex flex-col gap-2'>
                        {props.comments.map(el => (
                            // bg-blue-400 self-end
                            <div className={clsx('text-white rounded-xl p-2 w-max max-w-[65%] break-words', el.senderRole === 'admin' ? 'bg-blue-400 self-end' : 'bg-gray-300')}>
                                <span>{el.body}</span>
                                <div className='flex flex-wrap gap-[15px] items-end justify-end'>
                                    {el.photoIds?.map(f => (
                                        <div className='max-h-max max-w-max'>
                                            <img src={MediaService.getFile(f)} alt="Error" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        ))}
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex'>
                        <Textarea {...register('body')} placeholder='Напишите сообщение...' size='sm'/>
                        <input {...register('files')} ref={inputRef} type="file" multiple hidden />
                        <div className='flex flex-col'>
                            <Button type='submit' className='rounded-none' isIconOnly color='primary' variant='solid'><i><IoSend /></i></Button>
                            <Button onPress={() => inputRef.current?.click()} className='rounded-none' isIconOnly color='primary' variant='solid'><i><FaPaperclip /></i></Button>
                        </div>
                    </form>
                    <div className='flex flex-col gap-2'>
                        {/* {files.map(el => <div className='flex items-center gap-2'><span>{el.name}</span><Button onPress={() => setFiles(files.filter(f => f.name !== el.name))} isIconOnly variant='light' color='danger'><i>{<RxCross1 />}</i></Button></div>)} */}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default AppealChat