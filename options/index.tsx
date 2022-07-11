import "../styles/index"
import { ContentLayout } from "./components/ContentLayout"
import { BusinessForm } from "./components/Form"

function OptionsIndex() {
  document.title = chrome.i18n.getMessage("extensionName")

  return (
    <ContentLayout>
      <BusinessForm />
    </ContentLayout>
  )
}

export default OptionsIndex
