import { Button, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { FaPaperclip } from 'react-icons/fa'
import { IoSend } from 'react-icons/io5'
import { RxCross1 } from 'react-icons/rx'
import { AppealsService, MediaService } from 'src/shared/api'
import { useAppealsStore } from 'src/store/appeals'

type Props = {
    id: string
    number: number
    comments: any[]
    isOpen: boolean
    onOpenChange: any
}
const AppealChat: React.FC<Props> = props => {

    const {keycloak} = useKeycloak()

    const [body, setBody] = useState('')

    const {updateData} = useAppealsStore()

    const inputRef = useRef<any>(null)
    const [files, setFiles] = useState<any>([])


    const send = async () => {
        const photoIds: any[] = []
        
        if (keycloak.token) {
            //@ts-ignore
            Promise.all([...files].map((el:any) => MediaService.upload(keycloak.token, {file: el})))
            .then(res => {
                res.forEach(el => {
                    photoIds.push(el.data.id)                    
                })
                //@ts-ignore
                AppealsService.sendComment(keycloak.token, props.id, {body, photoIds})
                    .then(() => {
                        //@ts-ignore
                        updateData(keycloak.token)
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    }

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
                                    {el.photoIds.map(f => (
                                        <div className='max-h-max max-w-max'>
                                            <img src={MediaService.getFile(f)} alt="Error" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                        ))}
                    </div>
                    <div className='w-full flex'>
                        <Textarea onChange={el => setBody(el.target.value)} placeholder='Напишите сообщение...' size='sm'/>
                        <input onChange={e => {
                            //@ts-ignore
                            setFiles([...files, ...e.target.files])
                        }} type="file" multiple hidden ref={inputRef} />
                        <div className='flex flex-col'>
                            <Button onPress={send} className='rounded-none' isIconOnly color='primary' variant='solid'><i><IoSend /></i></Button>
                            <Button onPress={() => inputRef.current?.click()} className='rounded-none' isIconOnly color='primary' variant='solid'><i><FaPaperclip /></i></Button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {files.map(el => <div className='flex items-center gap-2'><span>{el.name}</span><Button onPress={() => setFiles(files.filter(f => f.name !== el.name))} isIconOnly variant='light' color='danger'><i>{<RxCross1 />}</i></Button></div>)}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
export default AppealChat