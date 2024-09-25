import { Button } from '@nextui-org/react'
import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useRef, useState } from 'react'
import { BiImport } from 'react-icons/bi'
import { useParams } from 'react-router-dom'
import { sendFile } from 'src/features/import/api'
import { useCategoriesStore } from 'src/store/categories'
import { useMenuStore } from 'src/store/menu'


const ImportMenu: React.FC = () => {

    const {data} = useMenuStore()

    const [type, setType] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const {keycloak} = useKeycloak()
    const {updateData} = useCategoriesStore()

    const {id} = useParams()

    useEffect(() => {
        setType(data.filter(el => el.id == id)[0]?.type)
    }, [id, data])

    return (
        <>
            <input onChange={event => sendFile(keycloak.token, type, id, event.target.files, updateData)} type='file' hidden ref={inputRef}/>
            <Button onPress={() => inputRef.current?.click()} className='w-fit' color='primary' variant='bordered'>
                <span>Импортировать меню</span>
                <BiImport/>
            </Button>
        </>
    )
}
export default ImportMenu