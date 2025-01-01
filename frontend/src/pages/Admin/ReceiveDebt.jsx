import React, { useState, useEffect } from "react";
import useFetchReceiveDebt from "../../hooks/useFetchReceiveDebt";
import ReceiveDebtCard from "../../components/ReceiveDebt/ReceiveDebtCard";
import AddReceiveDebtModal from "../../components/ReceiveDebt/AddReceiveDebtModal";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ReceiveDebt = () => {
  const { receiveDebts, isLoading, error, refetch } = useFetchReceiveDebt();
  const [localReceiveDebts, setLocalReceiveDebts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debtsPerPage, setDebtsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (receiveDebts) {
      setLocalReceiveDebts(receiveDebts);
    }
  }, [receiveDebts]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filterDebts = localReceiveDebts.filter((debt) =>
    debt.ReceivableId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (debt.userId && debt.userId.userName && debt.userId.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (debt.userId && debt.userId.userPhone && debt.userId.userPhone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Tính toán các khoản nợ hiện tại
  const indexOfLastDebt = currentPage * debtsPerPage;
  const indexOfFirstDebt = indexOfLastDebt - debtsPerPage;
  const currentDebts = filterDebts.slice(indexOfFirstDebt, indexOfLastDebt);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Thay đổi số lượng khoản nợ mỗi trang
  const handleDebtsPerPageChange = (event) => {
    setDebtsPerPage(Number(event.target.value));
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
            DANH SÁCH CÔNG NỢ NHẬN
          </h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Tìm kiếm công nợ..."
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
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300"
            >
              Thêm công nợ
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <select
              value={debtsPerPage}
              onChange={handleDebtsPerPageChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">khoản nợ mỗi trang</span>
          </div>
          
          <div className="text-sm text-gray-600">
            Hiển thị {indexOfFirstDebt + 1} - {Math.min(indexOfLastDebt, filterDebts.length)} trong tổng số {filterDebts.length} khoản nợ
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="bg-white shadow-md rounded-lg mx-4 md:mx-6">
          <div className=" hidden md:grid grid-cols-11 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 sticky top-0 z-10">
            <div className="col-span-1">Mã công nợ</div>
            <div className="col-span-2">Khách hàng</div>
            <div className="col-span-1">Số điện thoại</div>
            <div className="col-span-1">Nợ</div>
            <div className="col-span-1">Đã trả</div>
            <div className="col-span-1">Điều khoản</div>
            <div className="col-span-1">Tổng hóa đơn</div>
            <div className="col-span-1">Hạn trả</div>
            <div className="col-span-2 text-center">Thao tác</div>
          </div>
          <div className="divide-y divide-gray-200">
            {currentDebts && currentDebts.length > 0 ? (
              currentDebts.map((debt) => (
                <ReceiveDebtCard key={debt._id} receiveDebt={debt} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Không tìm thấy khoản nợ nào</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center items-center mt-4 mb-6 mx-4 md:mx-6">
        <Pagination
          itemsPerPage={debtsPerPage}
          totalItems={filterDebts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {isAddModalOpen && (
        <AddReceiveDebtModal
          onClose={() => setIsAddModalOpen(false)}
          onAddSuccess={handleAddSuccess}
        />
      )}
    </div>
  );
};

export default ReceiveDebt;
