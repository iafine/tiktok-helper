import { Button, Col, Form, Input, Row, Typography, message } from "antd"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage"

import {
  downloadAudioResource,
  downloadVideoResource,
  parseTikTok
} from "../../utils"
import { RoundLayout } from "./RoundLayout"

const { useForm } = Form

export const BusinessForm = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [videoParams, setVideoParams] = useState({}) as any
  const [form] = useForm()
  const [defaultLink] = useStorage("__TIKTOK_URL__")

  const onFormFinish = async (data) => {
    setVideoParams({})
    setSubmitLoading(true)
    const { link = "" } = data
    try {
      const params = await parseTikTok(link)
      setVideoParams(params)
    } catch (error) {
      console.error(error)
      message.error(chrome.i18n.getMessage("parseErrorTip"))
    }
    setSubmitLoading(false)
  }

  const downloadResource = async (url, type) => {
    if (type === "video") {
      setVideoLoading(true)
      try {
        await downloadVideoResource(url)
      } catch (error) {
        console.error(error)
      }
      setVideoLoading(false)
    }

    if (type === "audio") {
      setAudioLoading(true)
      try {
        await downloadAudioResource(url)
      } catch (error) {
        console.error(error)
      }
      setAudioLoading(false)
    }
  }

  const initValues: any = {}
  useEffect(() => {
    if (defaultLink) {
      initValues.link = defaultLink
      form.resetFields()
      onFormFinish(initValues)
    }
  }, [defaultLink])

  return (
    <RoundLayout title={chrome.i18n.getMessage("optionsLayoutTitle")}>
      <Form
        form={form}
        onFinish={onFormFinish}
        layout="vertical"
        size="middle"
        initialValues={initValues}>
        <Row>
          <Col span={18}>
            <Form.Item
              name="link"
              label={chrome.i18n.getMessage("optionsFormLinkLabel")}
              rules={[
                {
                  required: true,
                  message: chrome.i18n.getMessage("optionsFormLinkRuleMessage")
                }
              ]}>
              <Input
                placeholder={chrome.i18n.getMessage(
                  "optionsFormLinkPlaceholder"
                )}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitLoading}>
            {chrome.i18n.getMessage("optionsSubmitButton")}
          </Button>
        </Form.Item>
      </Form>
      <Row>
        {videoParams.nwmVideoUrl && (
          <Col span={18}>
            <div>
              <Typography.Text type="secondary">
                {chrome.i18n.getMessage("optionsResultTitle")}
                <Typography.Text>{videoParams.videoTitle}</Typography.Text>
              </Typography.Text>
            </div>
            <div>
              <Typography.Text type="secondary">
                {chrome.i18n.getMessage("optionsResultAuthor")}
                <Typography.Text>{videoParams.authorNickname}</Typography.Text>
              </Typography.Text>
            </div>
            <div className="my-3">
              <video autoPlay className="w-full max-h-80" controls width="250">
                <source src={videoParams.nwmVideoUrl} type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
            <Button
              type="primary"
              onClick={() => downloadResource(videoParams.nwmVideoUrl, "video")}
              loading={videoLoading}>
              {chrome.i18n.getMessage("optionsDownloadVideo")}
            </Button>
            <Button
              className="ml-3"
              type="primary"
              onClick={() => downloadResource(videoParams.musicUrl, "audio")}
              loading={audioLoading}>
              {chrome.i18n.getMessage("optionsDownloadAudio")}
            </Button>
          </Col>
        )}
      </Row>
    </RoundLayout>
  )
}
