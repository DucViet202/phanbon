import { Link, useNavigate } from "react-router-dom";
import NavbarCard from "./NavbarCard";
import { BsHouse, BsPeople, BsPeopleFill } from "react-icons/bs";
import { BiCategory, BiPackage } from "react-icons/bi";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { handleRefreshToken } from "../../utils/handleRefreshToken";
import { stateNavBar } from "./NavbarItems";
import { useState } from "react";
import { MdOutlineWarehouse } from "react-icons/md";
import { FcCustomerSupport, FcDebt } from "react-icons/fc";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { RiCoinsLine } from "react-icons/ri";

let listNavbar = [
  {
    path: "/",
    icon: <BsHouse size={28} />,
    label: "HOME",
    subMenu: [],
  },
  {
    path: "/products",
    icon: <BiPackage size={28} />,
    label: "SẢN PHẨM",
    group: "products",
    subMenu: [
      {
        icon: <BiPackage size={28} />,
        path: "/products",
        label: "DANH SÁCH SẢN PHẨM",
        group: "products",
      },
      {
        icon: <BiCategory size={28} />,
        path: "/categories",
        label: "DANH MỤC SẢN PHẨM",
        group: "products",
      },
    ],
  },
  {
    path: "/warehouse",
    icon: <MdOutlineWarehouse size={28} />,
    label: "KHO",
  },
  {
    path: "/sale-bills",
    icon: <CiMoneyBill size={28} />,
    label: "HÓA ĐƠN",
    group: "bill",
    subMenu: [
      {
        icon: <CiMoneyBill size={28} />,
        path: "/sale-bills",
        label: "HÓA ĐƠN BÁN HÀNG",
        group: "bill",
      },
      {
        icon: <CiMoneyBill size={28} />,
        path: "/purchase-bills",
        label: "HÓA ĐƠN NHẬP HÀNG",
        group: "bill",
      },
    ],
  },
  {
    path: "/staffs",
    icon: <BiPackage size={28} />,
    label: "ADMIN",
    group: "admin",
    subMenu: [
      {
        icon: <BiPackage size={28} />,
        path: "/staffs",
        label: "DANH SÁCH NHÂN VIÊN",
        group: "admin",
      },
      {
        icon: <BiCategory size={28} />,
        path: "/roles",
        label: "PHÂN QUYỀN",
        group: "admin",
      },
    ],
  },
  {
    path: "/customers",
    icon: <BsPeople size={28} />,
    label: "KHÁCH HÀNG",
  },
  {
    path: "/suppliers",
    icon: <SiHomeassistantcommunitystore size={28} />,
    label: "NHÀ CUNG CẤP",
  },
  {
    path: "/statistic",
    icon: <SiHomeassistantcommunitystore size={28} />,
    label: "DOANH THU",
  },
];

const NavbarDesktop = ({ setOpenMenu, isMenu }) => {
  const navigate = useNavigate();
  const [isExpanded, setExpanded] = useState(stateNavBar);
  if (localStorage.getItem("refreshToken") === null) {
    window.location.href = "/login";
  }
  const username = localStorage.getItem("username");
  const id = localStorage.getItem("userId");
  const logOutUser = async () => {
    try {
      const refreshToken = window.localStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.localStorage.clear();
        navigate("/");
        return;
      }


      const result = await axios({
        method: "patch",
        url: `${import.meta.env.VITE_LOCAL_API_URL}/auth/logout`,
        data: { refreshToken },
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (result.status === 200) {
        window.localStorage.clear();
        alert("Đăng xuất thành công");
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      if (error.response) {
        console.error("Dữ liệu phản hồi:", error.response.data);
        console.error("Trạng thái:", error.response.status);
        console.error("Headers:", error.response.headers);
      }
      alert(
        `Lỗi khi đăng xuất: ${error.response?.data?.message || error.message}`
      );
      // Trong trường hợp lỗi, vẫn xóa localStorage và chuyển hướng về trang chủ
      window.localStorage.clear();
      navigate("/");
    }
  };

  const handleLogOut = () => {
    logOutUser();
  };

  return (
    <nav className="flex flex-col h-screen bg-gradient-to-b from-[#1E3A8A] to-[#93C5FD] text-[#1E3A8A] w-64 shadow-xl ">
      {isMenu && (
        <div className="flex justify-end pr-2 pt-2">
          <IoMdClose
            className="hover:cursor-pointer"
            size={30}
            onClick={() => setOpenMenu(false)}
            color="white"
          />
        </div>
      )}
      <div className="py-6 px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="h1 text-[30px]">🌱</span>
            <h6 className="font-bold text-lg">QUẢN LÝ PHÂN BÓN</h6>
          </div>
        </div>
      </div>

      {/* w-full flex items-center justify-between rounded-lg px-4 py-2 font-bold */}
      <div className="bg-white rounded-lg shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold bg-clip-text bg-gradient-to-r from-[#00400A] to-[#32AC6D]">
            {username}
          </h1>
          <Link to={`/profile/${id}`}>
            <CiSettings size={30} />
          </Link>
        </div>
      </div>
      <div className="flex-grow px-2 overflow-hidden text-white">
        {listNavbar.map((item, index) => {
          return (
            <div key={index + " main_menu"} >
              <NavbarCard
                setExpanded={setExpanded}
                isExpanded={isExpanded}
                isSubMenu={false}
                navbar={item}
              />
              {item.subMenu &&
                item.subMenu.length > 0 &&
                item.subMenu.map((submenu, index) => {
                  const found = isExpanded.find(
                    (item) => submenu.group === item.belong
                  );
                  return (
                    <>
                      {submenu.group === found.belong && found.active && (
                        <NavbarCard
                          key={index + " sub_menu"}
                          navbar={submenu}
                          isSubMenu={true}
                          isParentActive={
                            submenu.group === found.belong && found.active
                          }
                        />
                      )}
                    </>
                  );
                })}
            </div>
          );
        })}
      </div>
      <div className="p-4">
        <button
          onClick={() => handleLogOut()}
          className="w-full py-2 text-center bg-white text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white transition-colors duration-200 rounded-full font-semibold shadow-md"
        >
          Đăng xuất
        </button>
      </div>
    </nav >
  );
};

export default NavbarDesktop;
