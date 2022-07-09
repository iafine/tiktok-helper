import { Button } from "antd"
import { useReducer } from "react"

import "../styles/index"
import { ContentLayout } from "./components/ContentLayout"
import { BusinessForm } from "./components/Form"

function OptionsIndex() {
  return (
    <ContentLayout>
      <BusinessForm />
    </ContentLayout>
  )
}

export default OptionsIndex
