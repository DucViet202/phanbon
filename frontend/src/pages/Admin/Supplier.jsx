import React, { useState, useCallback } from 'react';
import SupplierCard from '../../components/Supplier/SupplierCard';
import AddSupplierModal from '../../components/Supplier/AddSupplierModal';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useFetchSupplier from '../../hooks/useFetchSupplier';

const Supplier = () => {
  const { suppliers, isLoading, error, fetchSuppliers, addSupplier, updateSupplier, deleteSupplier } = useFetchSupplier();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliersPerPage, setSuppliersPerPage] = useState(10);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSuppliersPerPageChange = (event) => {
    setSuppliersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleAddSupplier = async (newSupplier) => {
    try {
      await addSupplier(newSupplier);
      setIsAddModalOpen(false);
      await fetchSuppliers();
    } catch (error) {
      console.error("Lỗi khi thêm nhà cung cấp:", error);
    }
  };

  const handleUpdateSupplier = async (updatedSupplier) => {
    try {
      // Tạo một bản sao của updatedSupplier và loại bỏ trường _id
      const { _id, ...supplierWithoutId } = updatedSupplier;
      await updateSupplier(supplierWithoutId);
      await fetchSuppliers();
    } catch (error) {
      console.error("Lỗi khi cập nhật nhà cung cấp:", error);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplierId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplierPhone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">Đã xảy ra lỗi: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="p-4 md:p-6 flex-shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] mb-4 md:mb-0">
            DANH SÁCH NHÀ CUNG CẤP
          </h1>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-64 mb-2 md:mb-0">
              <input
                type="text"
                placeholder="Tìm kiếm nhà cung cấp..."
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
              Thêm nhà cung cấp
            </button>
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <span className="text-sm text-gray-600">Hiển thị</span>
            <select
              value={suppliersPerPage}
              onChange={handleSuppliersPerPageChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">nhà cung cấp mỗi trang</span>
          </div>
          <div className="text-sm text-gray-600">
            Hiển thị {indexOfFirstSupplier + 1} - {Math.min(indexOfLastSupplier, filteredSuppliers.length)} trong tổng số {filteredSuppliers.length} nhà cung cấp
          </div>
        </div>
      </div>
  
      <div className="flex-grow overflow-auto px-4 md:px-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-gray-50 font-semibold text-gray-700 sticky top-0 z-10">
            <div className="hidden md:block col-span-1 text-center">Mã NHÀ CUNG CẤP</div>
            <div className="col-span-2 text-center">TÊN NHÀ CUNG CẤP</div>
            <div className="hidden md:block col-span-1 text-center">SỐ ĐIỆN THOẠI</div>
            <div className="hidden md:block col-span-1 text-center">Email</div>
            <div className="col-span-1 text-center">THAO TÁC</div>
          </div>
          <div className="divide-y divide-gray-200">
            {currentSuppliers.length > 0 ? (
              currentSuppliers.map((supplier) => (
                <SupplierCard
                  key={supplier._id}
                  supplier={supplier}
                  onUpdate={handleUpdateSupplier}
                  onDelete={deleteSupplier}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">Không tìm thấy nhà cung cấp nào.</div>
            )}
          </div>
        </div>
      </div>
  
      <div className="mt-4 mb-6 px-4 md:px-6">
        <Pagination
          itemsPerPage={suppliersPerPage}
          totalItems={filteredSuppliers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
  
      <AddSupplierModal 
       isOpen={isAddModalOpen}
       onClose={() => setIsAddModalOpen(false)} 
       onAddSupplier={handleAddSupplier} />
    </div>
  );
};

export default Supplier;