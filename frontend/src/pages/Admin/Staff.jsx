import React, { useState, useEffect, useCallback } from "react";
import useFetchStaffs from "../../hooks/useFetchStaffs";
import StaffCard from "../../components/Staff/StaffCard";
import AddStaffModal from "../../components/Staff/AddStaffModal";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Staff = () => {
  const { staffs, isLoading, error, refetch } = useFetchStaffs();
  const [localStaffs, setLocalStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [staffsPerPage, setStaffsPerPage] = useState(10);

  useEffect(() => {
    if (staffs) {
      setLocalStaffs(staffs);
    }
  }, [staffs]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStaffUpdated = useCallback((updatedStaff) => {
    setLocalStaffs(prevStaffs =>
      prevStaffs.map(staff =>
        staff._id === updatedStaff._id ? updatedStaff : staff
      )
    );
  }, []);

  const filterStaff = localStaffs.filter((staff) =>
    staff.nameAdmin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.adminId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán các nhân viên hiện tại
  const indexOfLastStaff = currentPage * staffsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffsPerPage;
  const currentStaffs = filterStaff.slice(indexOfFirstStaff, indexOfLastStaff);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Thay đổi số lượng nhân viên mỗi trang
  const handleStaffsPerPageChange = (event) => {
    setStaffsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleStaffAdded = useCallback(() => {
    refetch();
    setIsAddModalOpen(false);
  }, [refetch]);

  // Thay đổi phần này
  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <LoadingSpinner />
    </div>
  );
  if (error) return <div className="text-center py-8 text-red-500">Có lỗi xảy ra: {error}</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 md:p-6 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] mb-4 md:mb-0">
            DANH SÁCH NHÂN VIÊN
          </h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 pl-8 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all duration-300 ease-in-out"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full md:w-auto bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out font-semibold transform hover:scale-105"
            >
              Thêm nhân viên
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <select
              value={staffsPerPage}
              onChange={handleStaffsPerPageChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">nhân viên mỗi trang</span>
          </div>
          
          <div className="text-sm text-gray-600">
            Hiển thị {indexOfFirstStaff + 1} - {Math.min(indexOfLastStaff, filterStaff?.length || 0)} trong tổng số {filterStaff?.length || 0} nhân viên
          </div>
          
          {/* Phân trang cho thiết bị di động */}
          <div className="md:hidden mt-2">
            <Pagination
              itemsPerPage={staffsPerPage}
              totalItems={filterStaff?.length || 0}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="bg-white shadow-md rounded-lg mx-4 md:mx-6">
          <div className="hidden md:grid grid-cols-5 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 sticky top-0 z-10">
            <div className="col-span-1">Mã nhân viên</div>
            <div className="col-span-1">Username</div>
            <div className="col-span-1">Tên nhân viên</div>
            <div className="col-span-1">Trạng thái</div>
            <div className="col-span-1">Thao tác</div>
          </div>
          <div className="divide-y divide-gray-200">
            {currentStaffs && currentStaffs.length > 0 ? (
              currentStaffs.map((staff) => (
                <StaffCard 
                  key={staff._id} 
                  staff={staff} 
                  onStaffUpdated={handleStaffUpdated}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Không tìm thấy nhân viên nào</div>
            )}
          </div>
        </div>
      </div>
      
      {/* Phân trang cho màn hình lớn hơn */}
      <div className="hidden md:flex justify-center items-center mt-4 mb-6 mx-4 md:mx-6">
        
        <Pagination
          itemsPerPage={staffsPerPage}
          totalItems={filterStaff?.length || 0}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      
      {isAddModalOpen && (
        <AddStaffModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)}
          onStaffAdded={handleStaffAdded}
        />
      )}
    </div>
  );
};

export default Staff;
