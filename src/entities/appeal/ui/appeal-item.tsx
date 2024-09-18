import { Button, Card, CardBody, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { MdChat, MdDelete } from 'react-icons/md'
import { statuses } from 'src/entities/appeal/libs'
import { changeStatus } from 'src/entities/appeal/libs/changeStatus'
import { Appeal } from 'src/entities/appeal/model'
import AppealChat from 'src/entities/appeal/ui/appeal-chat'
import { AppealsService } from 'src/shared/api'
import { DeleteConfirm } from 'src/shared/ui'
import { useAppealsStore } from 'src/store/appeals'


const AppealItem: React.FC<Appeal> = props => {

    const {keycloak} = useKeycloak()
    const {updateData} = useAppealsStore()
    const deleteActive = useDisclosure()
    const chatActive = useDisclosure()

    return (
        <>
            <Card shadow='sm' className='p-4'>
                <CardBody>
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex flex-grow items-center gap-4'>
                            <h2 className='font-semibold'>Обраещние №{props.number}</h2>
                            <span>e-mail: {props.ownerEmail}</span>
                            <Select
                                className='w-2/6'
                                label='Статус обращения'
                                defaultSelectedKeys={[props.status]}
                                onChange={e => changeStatus(props.id, keycloak.token, e.target.value, updateData)}
                                >
                                {statuses.map((item) => (
                                    <SelectItem key={item.key}>
                                    {item.label}
                                    </SelectItem>
                                ))}
                            </Select>
                            <span>Роль: {props.ownerRole}</span>
                        </div>
                        <div className='flex gap-2'>
                            <Button onPress={chatActive.onOpen} isIconOnly variant='solid' color='primary' size='sm' className='text-base'>
                                <i><MdChat/></i>
                            </Button>                        
                            <Button 
                                onPress={deleteActive.onOpen} 
                                isIconOnly variant='solid' color='danger' size='sm' className='text-base'>
                                <i><MdDelete/></i>
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <DeleteConfirm isOpen={deleteActive.isOpen} onOpenChange={deleteActive.onOpenChange} function={async () => {
                 if (keycloak.token) {
                    await AppealsService.del(keycloak.token, props.id)
                    updateData(keycloak.token)
                }
            }} title={`удалить обращение №${props.number}`}/>
            <AppealChat id={props.id} number={props.number} comments={props.comments} isOpen={chatActive.isOpen} onOpenChange={chatActive.onOpenChange}/>
        </>
    )
}
export default AppealItem