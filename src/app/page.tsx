import React from 'react';
import ScrollScholarshipCardSimple from './components/organisms/scrollscholarshipcardsimple';
import BlockHeader2 from './components/atoms/block/block-header-2';
import GreetingCard from './components/organisms/greetingcard';
import scholarshipData from '@/db/fake-schol.json';
import ButtonActionText from './components/atoms/button/button-action-text';

import { auth } from '@/auth';
import { db } from '@/db';
import { scholarships } from '@/db/schema/scholarships';

export default async function Home() {
  
  const session = await auth();

  // Process the data as per requirements
  const listTest = scholarshipData.map(item => {
    return {
      id: 1,
      title: item.title,
      content: item.content,
      award: item.award,
      deadline: item.deadline,
      href: item.details,
      src: item.src,
      alt: item.alt
    };
  });

  return (
    <div>
        <GreetingCard />

        {/* Scholarship header */}
        <div className="flex justify-center mx-auto w-full pt-4 bg-slate-100 rounded-t-full">
          <BlockHeader2 header="Scholarships For You" />
        </div>

        <ScrollScholarshipCardSimple list={listTest} />
    </div>
  );
}
