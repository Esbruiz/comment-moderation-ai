import { type NextPage } from "next";
import Head from "next/head";
import {useEffect, useState} from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


const navigation = [
  { name: 'T1 Filter', href: '/t1filter' },
  { name: 'T2 filter', href: '/t2filter' },
  { name: 'T3 Filter', href: '/t3filter' },
]
const Home: NextPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [participate, setParticipate] = useState(false);

  useEffect(() => {
    const participate = localStorage.getItem('participate');
    if (participate && participate === 'true') {
      setParticipate(true);
    }else {
      setParticipate(false);
    }
  }, []);
  const enableParticipation = () => {
    localStorage.setItem('participate', 'true');
    setParticipate(true);
  };

  return (
    <>
      <Head>
        <title>Content Moderation - Homepage</title>
        <meta name="description" content="Content Moderation Homepage" />
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
                !participate ? (
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        You need to accept before you can participate
                    </p>
                ) : (
                    navigation.map((item) => (
                          <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                          </Link>
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
                    !participate ? (
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          You need to accept before you can participate
                        </p>
                    ) : (
                        navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Link>
                        ))
                    )
                  }
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Disclaimer</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            This project is for educational and research purposes only. Opinions or points of view expressed in this project dont represent the view of the
            Formula team. Nothing in this project constitutes the real views of the commenters. The individuals commenting in this project, are participating in showing the ways an LLM could be
            tricked into letting potential dangerous comments slip through detections of LLM.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
                onClick={() => enableParticipation()}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              I understand
            </button>
            <a href="https://www.google.com" className="text-sm font-semibold text-gray-900">
              Exit <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
</>
  );
};

export default Home;
