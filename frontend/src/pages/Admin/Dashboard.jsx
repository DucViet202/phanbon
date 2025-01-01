import React, { useState, useCallback, useMemo } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import useFetchDashboard from '../../hooks/useFetchdashboard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GradientBorderBox from '../../duong-vien/GradientBorderbox';
import LoadingSpinner from '../../components/common/LoadingSpinner';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

// Hàm để lọc dữ liệu âm
const filterNegativeValues = (data) => {
  return data.map(value => Math.max(0, value));
};

const Dashboard = () => {
  const getFirstDayOfCurrentWeek = () => {
    const now = new Date();
    const firstDay = new Date(now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)));
    return new Date(firstDay.setHours(0, 0, 0, 0));
  };

  const [startDate, setStartDate] = useState(getFirstDayOfCurrentWeek());
  const [endDate, setEndDate] = useState(new Date());
  
  const formatDate = (date) => date.toISOString().split('T')[0];
  
  const { data: revenueData, loading, error, refetch } = useFetchDashboard(formatDate(startDate), formatDate(endDate));

  const handleDateChange = useCallback(() => {
    refetch();
  }, [refetch]);

  const filteredReports = useMemo(() => {
    if (!revenueData || !revenueData.reports) return [];
    return revenueData.reports.filter(report => 
      report.totalRevenue !== 0 || 
      report.totalSales !== 0 || 
      report.totalPurchases !== 0 || 
      report.totalOrders !== 0
    );
  }, [revenueData]);

  const totalProfitData = useMemo(() => {
    if (filteredReports.length === 0) return { labels: [], data: [] };
    return {
      labels: filteredReports.map(report => new Date(report.date).toLocaleDateString('vi-VN')),
      data: filteredReports.map(report => report.totalRevenue)
    };
  }, [filteredReports]);

  const pieData = {
    labels: ['Doanh thu', 'Chi phí'],
    datasets: [
      {
        data: revenueData?.summary ? [revenueData.summary.totalSales, revenueData.summary.totalPurchases] : [0, 0],
        backgroundColor: ['#1E3A8A', '#f44336'],
      },
    ],
  };

  const barData = {
    labels: totalProfitData.labels,
    datasets: [
      {
        label: 'Tổng lợi nhuận',
        data: filterNegativeValues(totalProfitData.data),
        backgroundColor: '#1E3A8A',
      },
    ],
  };

  const salesData = {
    labels: ['Doanh thu', 'Chi phí'],
    datasets: [
      {
        label: 'Thống kê doanh số',
        data: revenueData?.summary 
          ? filterNegativeValues([
              revenueData.summary.totalSales, 
              revenueData.summary.totalPurchases, 
            ])
          : [0, 0],
        backgroundColor: ['#1E3A8A', '#f44336'],
      },
    ],
  };

  const profitLineData = {
    labels: totalProfitData.labels,
    datasets: [
      {
        label: 'Tổng lợi nhuận',
        data: filterNegativeValues(totalProfitData.data),
        borderColor: '#1E3A8A',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          font: {
            size: 12,
            weight: 'bold'
          },
          color: '#4a5568'
        }
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: '#2d3748'
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10
          },
          color: '#4a5568'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0'
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });
          },
          font: {
            size: 10
          },
          color: '#4a5568'
        }
      }
    }
  };
  
  const productProfitData = useMemo(() => {
    if (!revenueData || !revenueData.reports) return { labels: [], revenues: [], sales: [], purchases: [] };

    const productMap = new Map();

    revenueData.reports.forEach(report => {
      report.productReports.forEach(product => {
        if (!productMap.has(product.productId)) {
          productMap.set(product.productId, {
            productName: product.productName,
            totalRevenue: 0,
            totalSales: 0,
            totalPurchases: 0,
          });
        }
        const existingProduct = productMap.get(product.productId);
        existingProduct.totalRevenue += product.totalRevenue;
        existingProduct.totalSales += product.totalSales;
        existingProduct.totalPurchases += product.totalPurchases;
      });
    });

    const sortedProducts = Array.from(productMap.values())
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10); // Lấy top 10 sản phẩm có doanh thu cao nhất

    return {
      labels: sortedProducts.map(p => p.productName),
      revenues: sortedProducts.map(p => p.totalRevenue),
      sales: sortedProducts.map(p => p.totalSales),
      purchases: sortedProducts.map(p => p.totalPurchases),
    };
  }, [revenueData]);

  const productProfitChartData = {
    labels: productProfitData.labels,
    datasets: [
      {
        label: 'Doanh thu',
        data: productProfitData.revenues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Doanh số',
        data: productProfitData.sales,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Chi phí',
        data: productProfitData.purchases,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const productProfitChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 12,
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: 'Lợi nhuận theo sản phẩm (Top 10)',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          autoSkip: true,
          maxRotation: 90,
          minRotation: 0,
          font: {
            size: 8,
          },
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });
          },
          font: {
            size: 8,
          },
        },
      },
    },
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600 text-center p-4">Đã xảy ra lỗi: {error.message}</div>;

  return (
    <div className="bg-gray-100 p-2 sm:p-4 md:p-6 max-w-full overflow-x-hidden h-screen flex flex-col">
      <div className="flex flex-col space-y-4 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Dashboard thống kê</h1>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="p-2 border border-blue-300 rounded-md w-full md:w-auto bg-white shadow-sm"
            placeholderText="Ngày bắt đầu"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="p-2 border border-blue-300 rounded-md w-full md:w-auto bg-white shadow-sm"
            placeholderText="Ngày kết thúc"
          />
          <button 
            onClick={handleDateChange}
            className="bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD] text-white p-2 rounded-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out w-full sm:w-auto"
          >
            Cập nhật
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {filteredReports.length === 0 ? (
          <p className="text-center text-gray-500 bg-white rounded-lg shadow p-4">Không có dữ liệu cho khoảng thời gian này</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
            <GradientBorderBox className="bg-gradient-to-br from-[#1E3A8A] to-[#93C5FD] rounded-lg shadow p-4 col-span-1 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Tổng quan doanh thu và chi phí</h3>
              <div className="h-64 sm:h-80">
                <Pie data={pieData} options={{...options, maintainAspectRatio: false}} />
              </div>
            </GradientBorderBox>
            
            <GradientBorderBox className="bg-gradient-to-br from-[#1E3A8A] to-[#93C5FD] rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Thống kê doanh số</h3>
              <div className="h-64">
                <Bar data={salesData} options={{...options, maintainAspectRatio: false}} />
              </div>
            </GradientBorderBox>
            
            <GradientBorderBox className="bg-gradient-to-br from-[#1E3A8A] to-[#93C5FD] rounded-lg shadow p-4">
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Tổng lợi nhuận theo thời gian</h3>
              <div className="h-64">
                <Line data={profitLineData} options={{...options, maintainAspectRatio: false}} />
              </div>
            </GradientBorderBox>
            
            <GradientBorderBox className="bg-gradient-to-br from-[#1E3A8A] to-[#93C5FD] rounded-lg shadow p-4 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Tổng đơn hàng</h3>
              <p className="text-3xl font-bold text-blue-600">{revenueData?.summary?.totalOrders || 0} đơn bán hàng</p>
            </GradientBorderBox>
            
            <GradientBorderBox className="bg-gradient-to-br from-[#1E3A8A] to-[#93C5FD] rounded-lg shadow p-4 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Giá trị đơn hàng trung bình</h3>
              <p className="text-3xl font-bold text-blue-600">
                {revenueData?.summary?.averageOrderValue?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }) || '0 VND'}
              </p>
            </GradientBorderBox>
            
            <GradientBorderBox className="bg-gradient-to-br from-[#1E3A8A] to-[#93C5FD] rounded-lg shadow p-4 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Tổng lợi nhuận</h3>
              <p className="text-3xl font-bold text-blue-600">
                {(revenueData?.summary?.totalRevenue || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })}
              </p>
            </GradientBorderBox>
            
            <GradientBorderBox className="bg-gradient-to-br from-[#1E3A8A] to-[#93C5FD] rounded-lg shadow p-4 col-span-1 sm:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Tổng lợi nhuận theo ngày</h3>
              <div className="h-80">
                <Bar data={barData} options={{...options, maintainAspectRatio: false}} />
              </div>
            </GradientBorderBox>
            
            <GradientBorderBox className="bg-gradient-to-br from-[#1E3A8A] to-[#93C5FD] rounded-lg shadow p-4 col-span-1 sm:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#93C5FD]">Lợi nhuận theo sản phẩm (Top 10)</h3>
              <div className="h-80">
                <Bar data={productProfitChartData} options={{...productProfitChartOptions, maintainAspectRatio: false}} />
              </div>
            </GradientBorderBox>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;