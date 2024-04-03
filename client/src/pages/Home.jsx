import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAsync } from '../redux/features/user';
import { createTeamAsync } from '../redux/features/team';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { FaPlus } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import UserContainer from '@/components/UserContainer';
import TeamsModal from '@/components/TeamsModal';

import LoadingDots from '@/components/skeleton/LoadingDots';
import Sidebar from '@/components/Sidebar';

const Home = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user.users);
  const totalPages = useSelector((state) => state.user.totalPages);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const errorMsg = useSelector((state) => state.user.errorMsg);

  const [domain, setDomain] = useState('');
  const [gender, setGender] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [available, setAvailable] = useState('all');

  const [open, setOpen] = useState(false);

  const props = {
    search,
    page,
    gender,
    domain,
    available,
  };

  const fetchUserDetails = () => {
    dispatch(fetchUserAsync(props));
  };

  useEffect(() => {
    fetchUserDetails();
  }, [domain, page, gender, available]);

  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      fetchUserDetails();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleFilter = (key, filter) => {
    switch (filter) {
      case 'domain':
        setPage(1);
        if (domain.includes(key)) {
          setDomain(domain.filter((item) => item !== key));
        } else {
          setDomain([...domain, key]);
        }
        break;
      case 'gender':
        setPage(1);
        if (gender.includes(key)) {
          setGender(gender.filter((item) => item !== key));
        } else {
          setGender([...gender, key]);
        }
        break;
      case 'available':
        setPage(1);
        if (available === key) {
          setAvailable('all');
        } else {
          setAvailable(key);
        }
        break;
      default:
        break;
    }
  };

  const addTeam = () => {
    //take name from user
    const name = window.prompt('Enter team name');
    if (!name) return;
    dispatch(createTeamAsync(name));
  };

  return (
    <main className="container">
      <div className="flex py-10 gap-3 flex-col md:flex-row justify-center">
        <Sidebar {...{ domain, gender, available, handleFilter }} />

        <div className="flex-1 main">
          <div className="flex justify-between items-center gap-2">
            <Input
              className="w-[80%] max-w-[500px]"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                onClick={addTeam}
                className="bg-green-500 hover:bg-green-600"
              >
                <FaPlus />
                <span className="md:inline-block hidden md:ml-2">
                  Create Team
                </span>
              </Button>
              <Button onClick={() => setOpen(true)} className=" ">
                <FaRegEye />{' '}
                <span className="md:inline-block hidden md:ml-2">
                  View Teams
                </span>
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <section className="flex flex-col min-h-svh">
            {error && <p className="">{errorMsg}</p>}
            {loading && !users && <LoadingDots />}
            {users && <UserContainer users={users} />}
            <PaginationComp
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </section>
        </div>
      </div>
      <TeamsModal open={open} setOpen={setOpen} />
    </main>
  );
};

const PaginationComp = ({ currentPage, totalPages, onPageChange }) => {
  // Function to calculate the range of pages to show
  const getPageRange = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    // Adjust if near the start
    if (currentPage <= 3) {
      end = Math.min(5, totalPages);
    }

    // Adjust if near the end
    if (currentPage > totalPages - 3) {
      start = Math.max(totalPages - 4, 1);
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="self-center mt-8">
      <Pagination>
        <PaginationContent>
          {getPageRange().map((page) => (
            <PaginationItem
              className="cursor-pointer"
              key={page}
              onClick={() => onPageChange(page)}
            >
              <PaginationLink
                className={page === currentPage ? 'bg-black text-white' : ''}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Home;
