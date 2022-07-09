import { Button, Col, Form, Row, Upload } from "antd"
import { useState } from "react"
import { AiOutlineInbox } from "react-icons/ai"

import { userIsLogin } from "../../utils"
import { RoundLayout } from "./RoundLayout"

const { useForm } = Form

export const BusinessForm = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])
  const [form] = useForm()
  const formInitialValues = { fileList: [] }

  const onUploadViedeos = async () => {
    setSubmitLoading(true)
    console.log(fileList)
    console.log(chrome)

    await userIsLogin()

    setSubmitLoading(false)
  }

  const uploadProps: any = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])

      return false
    },
    fileList,
    directory: true
  }

  return (
    <RoundLayout title="发布视频">
      <div className="flex flex-col">
        <span>批量视频文件夹</span>
        <Upload {...uploadProps}>
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <AiOutlineInbox className="mb-3 w-10 h-10 text-gray-400" />
                <p className="mb-2 text-gray-500 text-base">
                  <span className="font-semibold">点击这里上传视频集合</span>{" "}
                  或者将文件夹拖入这里
                </p>
                <p className=" text-gray-500 text-xl">
                  注意：请提前确认好文件夹内的东西内容，否则会导致批量上传失败
                </p>
              </div>
            </div>
          </div>
        </Upload>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        loading={submitLoading}
        onClick={onUploadViedeos}>
        发布
      </Button>
    </RoundLayout>
  )
}
