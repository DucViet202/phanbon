import React, { useState, useEffect } from "react";
import useFetchCustomers from "../../hooks/useFetchCustomers";
import CustomerCard from "../../components/Customer/CustomerCard";
import AddCustomerModal from "../../components/Customer/AddCustomerModal";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Customer = () => {
  const { customers, isLoading, error, refetch } = useFetchCustomers();
  const [localCustomers, setLocalCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (customers) {
      setLocalCustomers(customers);
    }
  }, [customers]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filterCustomers = localCustomers.filter((customer) =>
    customer.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.userPhone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán khách hàng hiện tại
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filterCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Thay đổi số lượng khách hàng mỗi trang
  const handleCustomersPerPageChange = (event) => {
    setCustomersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleAddSuccess = () => {
    refetch();
  };

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
            DANH SÁCH KHÁCH HÀNG
          </h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
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
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              Thêm khách hàng
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <select
              value={customersPerPage}
              onChange={handleCustomersPerPageChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">khách hàng mỗi trang</span>
          </div>
          
          <div className="text-sm text-gray-600">
            Hiển thị {indexOfFirstCustomer + 1} - {Math.min(indexOfLastCustomer, filterCustomers.length)} trong tổng số {filterCustomers.length} khách hàng
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="bg-white shadow-md rounded-lg mx-4 md:mx-6">
          <div className="hidden md:grid grid-cols-11 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 sticky top-0 z-10">
            <div className="col-span-1">Mã khách hàng</div>
            <div className="col-span-2">Tên khách hàng</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-2">Địa chỉ</div>
            <div className="col-span-1">Điện thoại</div>
            <div className="col-span-1">Tình trạng</div>
            <div className="col-span-2 text-center">Thao tác</div>
          </div>
          <div className="divide-y divide-gray-200">
            {currentCustomers && currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <CustomerCard key={customer._id} customer={customer} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Không tìm thấy khách hàng nào</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center items-center mt-4 mb-6 mx-4 md:mx-6">
        <Pagination
          itemsPerPage={customersPerPage}
          totalItems={filterCustomers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {isAddModalOpen && (
        <AddCustomerModal
          onClose={() => setIsAddModalOpen(false)}
          onAddSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
};

export default Customer;
