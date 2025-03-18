import { gql } from "@apollo/client";

export const GET_GROCERRY_SLIDER = gql`
  {
    allM_Asset(
      where: { id_anyOf: ["YtCyUmHhRLC8BLfeoIFptg", "fXaN-EaBSJ642zU9lzi3Dw"] }
    ) {
      results {
        id
        urls
      }
    }
  }
`;

const GET_DATA = gql`
  {
    allM_PCM_Product(
      where: {
        pCMProductFamilyToProduct: {
          m_PCM_ProductFamily_ids: [
            "S7rJAc_JQsmM-4yVpnaOzw"
            "fJwuqL73T225gBOG4W8bLA"
          ]
        }
        localizationToProduct: { m_Localization_ids: "M.Localization.en-US" }
      }
    ) {
      results {
        productLabel
        productShortDescription
        productLongDescription
        productPrice
        productNumber
        marketingNote
        pCMProductToMasterAsset {
          results {
            assetToPublicLink {
              results {
                id
                status
                relativeUrl
                resource
                expirationDate
              }
            }
            fileName
            id
            urls
          }
        }
        pCMProductFamilyToProduct {
          results {
            productFamilyLabel
          }
        }
      }
    }
  }
`;

export const GET_GROCERRY_PRODUCTS = gql`
  {
    allM_PCM_ProductFamily(where: { productFamilyName_contains: "InGrocery" }) {
      results {
        productFamilyLabel
        productFamilyShortDescription
        pCMProductFamilyToProduct {
          results {
            productLabel
            productShortDescription
            productLongDescription
            productNumber
            productPrice
            marketingNote
            pCMProductToMasterAsset {
              results {
                urls
              }
            }
            pCMProductFamilyToProduct {
              results {
                productFamilyLabel
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_GROCERRY_PRODUCTFAMALIES = gql`
  {
    allM_PCM_ProductFamily(where: { productFamilyName_contains: "InGrocery" }) {
      results {
        productFamilyName
        productFamilyLabel
        pCMProductFamilyToMasterAsset {
          results {
            urls
          }
        }
      }
    }
  }
`;
