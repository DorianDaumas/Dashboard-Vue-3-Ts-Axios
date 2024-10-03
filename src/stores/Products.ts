import { ref } from 'vue'
import { defineStore } from 'pinia'
import { productDetailSchema, type ProductType } from '@/components/Ecommerce/Product/productType'
import {
  OtherProductSchema,
  type otherProductType
} from '@/components/Ecommerce/Product/otherProductType'
import { userProductSchema, type userProductType } from '@/components/Profil/userProductType'
import { fetchUnitProductApi, fetchOtherProductsApi, fetchUserProductApi } from './api/Products'
import type { APIResponse } from './ApiType'
import { AxiosError } from 'axios'

export const useProductsStore = defineStore('products', () => {
  const product = ref<ProductType>(productDetailSchema)
  const otherProducts = ref<otherProductType>(OtherProductSchema)

  const userProducts = ref<userProductType>(userProductSchema)
  const loadingProducts = ref(false)
  const loadingOtherProducts = ref(false)
  const loadingUserProducts = ref(false)
  const fetchUnitProduct = async (productId: number): Promise<APIResponse<ProductType>> => {
    loadingProducts.value = true
    try {
      const { status, data } = await fetchUnitProductApi(productId)
      if (status === 200) {
        product.value.productDetail = data
        loadingProducts.value = false
        return {
          success: true,
          content: product.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      loadingProducts.value = false
      return {
        success: false,
        status: _error.status,
        content: product.value
      }
    }
    loadingProducts.value = false
    return {
      success: false,
      content: product.value
    }
  }

  const fetchOtherProducts = async (skip: number): Promise<APIResponse<otherProductType>> => {
    loadingOtherProducts.value = true
    try {
      const { status, data } = await fetchOtherProductsApi(skip)
      if (status === 200) {
        otherProducts.value.otherProducts.otherProductsDetail = data.products
        otherProducts.value.otherProducts.limit = data.limit
        loadingOtherProducts.value = false
        return {
          success: true,
          content: otherProducts.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      loadingOtherProducts.value = false
      return {
        success: false,
        status: _error.status,
        content: otherProducts.value
      }
    }
    loadingOtherProducts.value = false
    return {
      success: false,
      content: otherProducts.value
    }
  }

  const fetchUserProduct = async (userId: number): Promise<APIResponse<userProductType>> => {
    loadingUserProducts.value = true
    try {
      const { status, data } = await fetchUserProductApi(userId)
      if (status === 200) {
        userProducts.value.userProduct.products = data.carts[0].products
        userProducts.value.userProduct.id = data.carts[0].id
        userProducts.value.userProduct.total = data.carts[0].total
        return {
          success: true,
          content: userProducts.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      loadingUserProducts.value = false
      return {
        success: false,
        status: _error.status,
        content: userProducts.value
      }
    }
    loadingUserProducts.value = false
    return {
      success: false,
      content: userProducts.value
    }
  }

  return {
    product,
    fetchUnitProduct,
    fetchOtherProducts,
    fetchUserProduct,
    otherProducts,
    loadingProducts,
    userProducts,
    loadingOtherProducts,
    loadingUserProducts
  }
})
