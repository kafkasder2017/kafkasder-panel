'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">KAFKASDER Yönetim Paneli</h1>
      <p className="text-gray-600 mt-2">Tüm modülleri tek yerden yönetin</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Bağış Yönetimi</h3>
          <p className="text-sm text-gray-600 mt-2">Nakit, çek/senet, kredi kartı ve ayni bağışları yönetin</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Kişiler & Kurumlar</h3>
          <p className="text-sm text-gray-600 mt-2">Kişi ve kurum bilgilerini yönetin</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Organizasyonlar</h3>
          <p className="text-sm text-gray-600 mt-2">Organizasyon ve şube yönetimi</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Yardım Yönetimi</h3>
          <p className="text-sm text-gray-600 mt-2">Nakdi ve ayni yardım işlemleri</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Üye Yönetimi</h3>
          <p className="text-sm text-gray-600 mt-2">Üye kayıtları ve aidat takibi</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900">Finans & Fon</h3>
          <p className="text-sm text-gray-600 mt-2">Banka işlemleri ve finansal raporlar</p>
        </div>
      </div>
    </div>
  )
}
