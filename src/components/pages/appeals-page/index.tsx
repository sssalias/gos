import AppealsList from 'src/components/organisms/appeals-list'
import BaseTemplate from 'src/components/templates/base-template'

const AppealsPage = () => {
    return (
      <BaseTemplate>
        <h1>Обращения</h1>
        <AppealsList/>
      </BaseTemplate>
    )
}

export default AppealsPage