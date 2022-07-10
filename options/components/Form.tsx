import { Button, Col, Form, Input, Row, Typography } from "antd"
import { useState } from "react"

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

  const onFormFinish = async (data) => {
    setVideoParams({})
    setSubmitLoading(true)
    const { link = "" } = data
    try {
      const params = await parseTikTok(link)
      console.log(params)
      setVideoParams(params)
    } catch (error) {
      console.error(error)
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

  return (
    <RoundLayout title="TikTok视频解析">
      <Form form={form} onFinish={onFormFinish} layout="vertical" size="middle">
        <Row>
          <Col span={18}>
            <Form.Item
              name="link"
              label="链接"
              rules={[{ required: true, message: "请输入链接" }]}>
              <Input placeholder="请输入链接" allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submitLoading}>
            解析视频
          </Button>
        </Form.Item>
      </Form>
      <Row>
        {videoParams.nwmVideoUrl && (
          <Col span={18}>
            <Typography.Title level={5}>
              {videoParams.videoTitle}
            </Typography.Title>
            <div>
              <Typography.Text type="secondary">
                作者：
                <Typography.Text>{videoParams.authorNickname}</Typography.Text>
              </Typography.Text>
            </div>
            <div>
              <Typography.Text type="secondary">
                创建日期：
                <Typography.Text>{videoParams.createTime}</Typography.Text>
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
              下载视频
            </Button>
            <Button
              className="ml-3"
              type="primary"
              onClick={() => downloadResource(videoParams.musicUrl, "audio")}
              loading={audioLoading}>
              下载音频
            </Button>
          </Col>
        )}
      </Row>
    </RoundLayout>
  )
}
