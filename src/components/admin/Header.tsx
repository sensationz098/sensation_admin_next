import Link from "next/link";

type AdminHeaderType = {
  title: string;
  url: string;
};

const Header = () => {
  const headerLinks: AdminHeaderType[] = [
    {
      title: "Dashboard",
      url: "/admin",
    },
    {
      title: "Course",
      url: "/admin/course",
    },
    {
      title: "Users",
      url: "/admin/user",
    },
    {
      title: "Teachers",
      url: "/admin/teacher",
    },
    {
      title: "Students",
      url: "/admin/students",
    },
  ];

  return (
    <header>
      <div className="flex items-center justify-start flex-row gap-4">
        {headerLinks.map((link, index) => (
          <Link key={index} href={link.url}>
            {link.title}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
