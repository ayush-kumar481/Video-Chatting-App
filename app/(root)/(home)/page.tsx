import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'
import { setInterval } from 'timers/promises';

const Home = () => {

  const now = new Date();
  function formatDate(date: Date): string {
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayName: string = days[date.getDay()];
    const day: number = date.getDate();
    const monthName: string = months[date.getMonth()];
    const year: number = date.getFullYear();
    return `${dayName}, ${day} ${monthName} ${year}`;
  }
  const date: Date = new Date();
  const formattedDate: string = formatDate(date);
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });






  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <div className='h-[303px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at: 12:30 PM</h2>
          <div className='flex gap-2 flex-col'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{formattedDate}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home