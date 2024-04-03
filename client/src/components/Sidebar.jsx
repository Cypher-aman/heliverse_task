import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';

const domains = [
  'Sales',
  'IT',
  'UI Designing',
  'Management',
  'Marketing',
  'Finance',
  'Business Development',
];
const genders = [
  'Male',
  'Female',
  'Agender',
  'Bigender',
  'Polygender',
  'Non-binary',
  'Genderfluid',
  'Genderqueer',
];

const Sidebar = ({ gender, domain, available, handleFilter }) => {
  const [open, setOpen] = useState(false);

  return (
    <aside className=" md:p-1 md:w-[20%] md:min-h-screen ">
      <div className="hidden w-full md:block">
        <LargeScreenSidebar {...{ gender, domain, available, handleFilter }} />
      </div>

      <div className="block md:hidden">
        <Button onClick={() => setOpen(true)} variant="outline" size="sm">
          <GiHamburgerMenu />
        </Button>
        <SmallScreenSidebar
          {...{ gender, domain, available, handleFilter, open, setOpen }}
        />
      </div>
    </aside>
  );
};

const LargeScreenSidebar = ({ gender, domain, available, handleFilter }) => {
  return (
    <>
      <p className="font-semibold text-xl mb-5">Filter</p>
      <p className="mb-2 font-medium">Domain</p>
      <div className="flex flex-wrap gap-2">
        {domains.map((item) => (
          <Button
            key={item}
            onClick={() => handleFilter(item, 'domain')}
            variant={domain.includes(item) ? 'default' : 'outline'}
          >
            {item}
          </Button>
        ))}
      </div>
      <Separator className="my-3" />
      <p className="mb-2 font-medium">Gender</p>
      <div className="flex flex-wrap gap-2">
        {genders.map((item) => (
          <Button
            key={item}
            onClick={() => handleFilter(item, 'gender')}
            variant={gender.includes(item) ? 'default' : 'outline'}
          >
            {item}
          </Button>
        ))}
      </div>
      <Separator className="my-3" />
      <p className="mb-2 font-medium">Available</p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={available === true ? 'default' : 'outline'}
          onClick={() => handleFilter(true, 'available')}
        >
          Available
        </Button>
        <Button
          variant={available === false ? 'default' : 'outline'}
          onClick={() => handleFilter(false, 'available')}
        >
          Unavailable
        </Button>
      </div>{' '}
      <Separator className="mx-2" orientation="vertical" />
    </>
  );
};

const SmallScreenSidebar = ({
  gender,
  domain,
  available,
  handleFilter,
  open,
  setOpen,
}) => {
  useEffect(() => {
    // Function to toggle the overflow style on the body
    const toggleBodyScroll = (shouldPreventScroll) => {
      document.body.style.overflow = shouldPreventScroll ? 'hidden' : '';
    };

    // Apply the appropriate style based on the sidebar state
    toggleBodyScroll(open);

    // Cleanup function to reset the overflow style when the component unmounts or the sidebar closes
    return () => {
      toggleBodyScroll(false);
    };
  }, [open]);

  if (!open) return null;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30"></div>
      <div className="fixed bottom-0 left-0 max-w-[400px] shadow-lg top-0 w-[80%] z-20 bg-white p-4">
        <Button
          className="absolute top-2 right-2"
          onClick={() => setOpen(false)}
          variant="outline"
        >
          <RxCross2 />
        </Button>
        <p className="font-semibold text-xl mb-5">Filter</p>
        <p className="mb-2 font-medium text-left">Domain</p>
        <div className="flex flex-wrap gap-2">
          {domains.map((item) => (
            <Button
              key={item}
              onClick={() => handleFilter(item, 'domain')}
              variant={domain.includes(item) ? 'default' : 'outline'}
            >
              {item}
            </Button>
          ))}
        </div>
        <Separator className="my-3" />
        <p className="mb-2 font-medium text-left">Gender</p>
        <div className="flex flex-wrap gap-2">
          {genders.map((item) => (
            <Button
              key={item}
              onClick={() => handleFilter(item, 'gender')}
              variant={gender.includes(item) ? 'default' : 'outline'}
            >
              {item}
            </Button>
          ))}
        </div>
        <Separator className="my-3" />
        <p className="mb-2 font-medium text-left">Available</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={available === true ? 'default' : 'outline'}
            onClick={() => handleFilter(true, 'available')}
          >
            Available
          </Button>
          <Button
            variant={available === false ? 'default' : 'outline'}
            onClick={() => handleFilter(false, 'available')}
          >
            Unavailable
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
