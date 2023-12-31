import ProfileUserCard from '@/app/components/organisms/profileusercard'
import TabsScholarshipCardProfile from '@/app/components/organisms/tabsscholarshipcardprofile'
import scholarshipList from '@/db/fake-schol.json'

import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { getAppliedScholarships, getSavedScholarships } from './action'

export default async function ProfilePage() {

  const session = await auth();
  
  let listApplied = [];
  let listSaved = [];
  let userId;

  if(session) {
    userId = session.user.id;
  }

  if(userId) {
    listApplied = await getAppliedScholarships(userId);
    listSaved = await getSavedScholarships(userId)
  }

  listApplied = listApplied.map(item => {
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      award: item.award,
      deadline: item.deadline,
      href: item.href,
      src: item.src,
      alt: item.alt,
      isApplied: true
    }
  })

  listSaved = listSaved.map(item => {
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      award: item.award,
      deadline: item.deadline,
      href: item.href,
      src: item.src,
      alt: item.alt,
      isApplied: false,
    }
  })

  revalidatePath("/profile")

  return (
    <div className="flex flex-col rounded-xl mx-auto w-full 
    overflow-scroll mb-14 md:flex-row md:overflow-x-auto md:w-5/6 md:mt-[100px] md:h-auto">
      <div>
        <ProfileUserCard />
      </div>
      <div>
        <TabsScholarshipCardProfile listSaved={listSaved} listApplied={listApplied} />
      </div>
    </div>
  )
}
