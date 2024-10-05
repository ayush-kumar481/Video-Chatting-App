'use client';
import Image from 'next/image';
import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';

const MeetingTypeList = () => {

  const router = useRouter();
  const [MeetingState, setMeetingState] = useState<'isSchedulingMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [Values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetails, setcallDetails] = useState<Call>()
  const { toast } = useToast()

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!Values.dateTime) {
        toast({ title: "Failed to create the meeting" })
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error("failed to create call")
      const startsAt = Values.dateTime ? Values.dateTime.toISOString() : new Date().toISOString();
      const description = Values.description || 'Instant Meeting'

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setcallDetails(call)

      if (!Values.description) {
        router.push('/meeting/${call.id)')
      }

      toast({ title: "Meeting Created" })
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create the meeting", })

    }
  }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleclick={() => setMeetingState('isInstantMeeting')}
        classname='bg-orange-1'
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your Meeting"
        handleclick={() => setMeetingState('isSchedulingMeeting')}
        classname='bg-blue-1'
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check your recordings"
        handleclick={() => router.push('recordings')}
        classname='bg-purple-1'
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via Invitation Link"
        handleclick={() => { setMeetingState('isJoiningMeeting') }}
        classname='bg-yellow-1'
      />

      <MeetingModal
        isOpen={MeetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList