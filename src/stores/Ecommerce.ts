import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchProductCategorieApi,
  fetchProductsApi,
  fetchProductsCategoryApi
} from './api/Ecommerce'
import type { APIResponse } from './ApiType'
import { AxiosError } from 'axios'
import type { CategorieType } from '@/components/Ecommerce/Products/filtersType'
import {
  productSchema,
  type ProductsListType
} from '@/components/Ecommerce/Products/productListType'

export const useEcommerceStore = defineStore('ecommerce', () => {
  const productsCategorie = ref<CategorieType>({ categories: [{ name: '', slug: '' }] })

  const productsList = ref<ProductsListType>(productSchema)

  const fetchProductCategorie = async (): Promise<APIResponse<CategorieType>> => {
    try {
      const { status, data } = await fetchProductCategorieApi()
      productsCategorie.value.categories = data
      if (status === 200) {
        return {
          success: true,
          content: productsCategorie.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>

      return {
        success: false,
        status: _error.status,
        content: productsCategorie.value
      }
    }
    return {
      success: false,
      content: productsCategorie.value
    }
  }

  const fetchProducts = async (
    search: string,
    itemPerPage: number,
    page: number,
    selectOrder: string
  ): Promise<APIResponse<ProductsListType>> => {
    try {
      const { status, data } = await fetchProductsApi(search, itemPerPage, page, selectOrder)
      productsList.value.products = data.products
      productsList.value.total = data.total
      if (status === 200) {
        return {
          success: true,
          content: productsList.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>

      return {
        success: false,
        status: _error.status,
        content: productsList.value
      }
    }
    return {
      success: false,
      content: productsList.value
    }
  }

  const fetchProductsCategory = async (
    category: string,
    itemPerPage: number,
    page: number,
    selectOrder: string
  ): Promise<APIResponse<ProductsListType>> => {
    try {
      const { status, data } = await fetchProductsCategoryApi(
        category,
        itemPerPage,
        page,
        selectOrder
      )
      productsList.value.products = data.products
      productsList.value.total = data.total
      if (status === 200) {
        return {
          success: true,
          content: productsList.value,
          status: 200
        }
      }
    } catch (error) {
      const _error = error as AxiosError<string>

      return {
        success: false,
        status: _error.status,
        content: productsList.value
      }
    }
    return {
      success: false,
      content: productsList.value
    }
  }

  return {
    productsCategorie,
    fetchProductCategorie,
    fetchProducts,
    productsList,
    fetchProductsCategory
  }
})
