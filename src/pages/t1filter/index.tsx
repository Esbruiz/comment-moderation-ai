import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import {useState} from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { UserIcon } from '@heroicons/react/20/solid'
import Comment from "~/components/Comment";
import toast from "react-hot-toast";

const navigation = [
  { name: 'T1 Filter', href: '/t1filter' },
  { name: 'T2 Filter', href: '/t2filter' },
  { name: 'T3 Filter', href: '/t3filter' },
]
const CreateT1Comment: NextPage = () => {
  const { data, isLoading, refetch } = api.comments.getAllT1Comments.useQuery();
  const createT1Comment = api.comments.createT1Comment.useMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const createComment = async (comment: string, author = 'Anonymous') => {
    await createT1Comment.mutateAsync({ comment, author }, {
        onSuccess: () => {
          void refetch();
        },
        onError: (error) => {
          if(error.message === "TOO_MANY_REQUESTS") {
            toast('You are doing that too much', {
                icon: '🔥',
            });
            return;
          } else {
            toast('Something went wrong', {
                icon: '🔥',
            });
          }
        }
    });
  }

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(!data) {
    return <div>Something went wrong</div>
  }

  return (
    <>
      <Head>
        <title>Content Moderation - T1</title>
        <meta name="description" content="Content Moderation T1" />
        <link rel="icon" href="https://assets-global.website-files.com/63c99e73eee7982d78eb62a6/641cd0e8de34777ee5530102_formula.monks.svg" />
      </Head>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex items-center gap-x-12">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://assets-global.website-files.com/63c99e73eee7982d78eb62a6/641cd0e8de34777ee5530102_formula.monks.svg" alt="" />
            </a>
            <div className="hidden lg:flex lg:gap-x-12">
              {
                (
                    navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                          {item.name}
                        </a>
                    ))
                )
              }
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                />
              </a>
              <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">

                  {
                    navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                    ))
                  }
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="bg-white w-full">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div className="lg:col-span-4 lg:col-start-1 lg:mt-0">
              <p>Info about settings</p>
            </div>
            <div className="lg:col-span-8 lg:col-start-5 lg:mt-0">
              <div>
                <Comment onPost={createComment} />
              </div>
              <h3 className="sr-only">Recent Comments</h3>
              <div className="flow-root">
                <div className="my-12 divide-y divide-gray-200">
                  {
                    !data.length ? (
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-semibold text-gray-900">No comments yet</div>
                            <div className="mt-1 text-gray-500">Be the first to comment</div>
                          </div>
                        </div>
                    ) : (
                        data.map((comment) => (
                            <div key={comment.id} className="py-12">
                              <div className="flex items-center">
                                <UserIcon className="h-12 w-12 rounded-full" />
                                <div>
                                  <div className="ml-4">
                                    <h4 className="text-sm font-bold text-gray-900">{comment.author}</h4>
                                  </div>
                                  <p
                                      className="ml-4 mt-1 space-y-6 text-base text-gray-600"
                                  >
                                    {comment.comment}
                                  </p>
                                </div>
                              </div>
                            </div>
                        ))
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
</>
  );
};

export default CreateT1Comment;
