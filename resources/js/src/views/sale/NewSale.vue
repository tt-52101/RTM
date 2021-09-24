<template>

    <vs-row>
        <transition name="slide-fade">
            <vs-col  vs-type="flex" vs-justify="center" vs-w="9" vs-xs="12" v-if="!viewHeadSale">
                <vs-row>
                    <vs-col style="padding: 5px" vs-xs="12">
                        <vs-row >
                            <vs-col vs-w="4" vs-xs="12">
                                <v-select
                                    v-model="selected"
                                    label="title"
                                    :options="option"
                                />
                            </vs-col>
                            <vs-col vs-w="8" vs-xs="12" style="padding-left: 10px">
                                <vs-input @keyup="filterProduct" id="inputSearch" key="inputSearch" style="width: 100%" icon="search" placeholder="Busca tu producto" v-model="searchValue"/>
                            </vs-col>
                        </vs-row>
                    </vs-col>
                    <vs-col :key="index" v-for="p,index in productsFilter" vs-justify="center" vs-align="center" vs-w="3" vs-xs="6">
                        <div style="padding: 5px; width: 100%">
                            <vs-card>
                                <div slot="media">
                                    <template v-if="p.URLImagen !== null">
                                        <img :src="p.URLImagen">
                                    </template>
                                    <template v-else>
                                        <img src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/03.ada37056.jpg">
                                    </template>
                                </div>

                                <div>
                                    <h6>{{p.Producto}}</h6>
                                    <span  style="font-size: 28px;color: #1b9a59">
                                    S/. {{p.PVenta}}
                                </span>
                                </div>
                                <div slot="footer">
                                    <vs-row vs-justify="flex-end">
                                        <vs-button v-on:click="addProduct(p.IDProducto)" type="gradient" color="success" icon="add"></vs-button>
                                    </vs-row>
                                </div>
                            </vs-card>
                        </div>
                    </vs-col>
                </vs-row>
            </vs-col>
        </transition>

        <vs-col vs-align="top" vs-w="3" vs-xs="12">
            <div style="padding: 5px;     height: 100%;">
                <vs-card class="cardx">
                    <div slot="header">
                        <h4 style="padding-left: 5px">
                            Caja 1
                        </h4>
                    </div>
                    <div>
                        <div id="detail-container">
                            <vs-list>
                                <vs-list-header icon="shopping_cart" title="Detalle de venta"></vs-list-header>
                                <ul class="list-detail">
                                    <li v-for="item in saleDetail" >
                                        <vs-row>
                                            <vs-col vs-w="7">
                                                <strong>{{item.Producto}}</strong>
                                                P. Venta: S/.{{item.PVenta}}
                                            </vs-col>
                                            <vs-col vs-w="5">
                                                <div class="content-group-btn">
                                                    <div class="btn-add" @click="removeProduct(item.IDProducto)">-</div>
                                                    <div class="result">{{item.cant}}</div>
                                                    <div class="btn-add" @click="addProduct(item.IDProducto)">+</div>
                                                </div>
                                            </vs-col>
                                        </vs-row>

                                    </li>
                                    <li v-if="saleDetail.length === 0">
                                        Seleccione un producto
                                    </li>
                                </ul>

                            </vs-list>

                        </div>
                        <vs-divider>
                            Total
                        </vs-divider>
                        <div style="padding-bottom: 15px;">
                            <h3>Total: {{totalSale}}</h3>
                        </div>

                        <vs-button :disabled="totalSale<=0" v-if="!viewHeadSale" style="width: 100%" icon="arrow_forward_ios" color="success" type="filled" @click="showHeadSale">Siguiente</vs-button>
                        <vs-button v-else style="width: 100%" icon="arrow_back_ios" color="primary" type="filled" @click="showHeadSale">Atras</vs-button>
                    </div>
                    <div slot="footer">

                    </div>
                </vs-card>
            </div>
        </vs-col>
        <vs-col  vs-type="flex" vs-align="top" vs-w="9" vs-xs="12 " v-if="viewHeadSale">
            <div style="padding: 5px;height: 100%; width: 100%">
                <vx-card title="Comprobante de venta" subtitle="">
                   <vs-row>
                       <vs-col vs-w="5">
                           <vs-row>
                               <vs-col vs-w="6">
                                   <div class="form-group c-select">
                                       <div class="c-label">T. Comprobante</div>
                                       <v-select
                                           v-model="headSale.typeSale"
                                           label="title"
                                           :options="optionTicket"
                                       />
                                   </div>
                               </vs-col>
                               <vs-col vs-w="6">
                                   <div class="form-group c-select">
                                       <div class="c-label">Serie</div>
                                       <v-select
                                           v-model="headSale.serie"
                                           label="title"
                                           :options="optionSerie"
                                       />
                                   </div>
                               </vs-col>
                           </vs-row>
                       </vs-col>
                       <vs-col vs-w="3">
                           <div class="form-group ">
                               <div class="c-label">F. Venta</div>
                               <vs-input type="date" v-model="headSale.dateSale"/>
                           </div>

                       </vs-col>
                       <vs-col vs-w="2">
                           <div class="form-group ">
                               <div class="c-label">Num. Nota</div>
                               <vs-input type="text" v-model="headSale.numNota"/>
                           </div>
                       </vs-col>
                   </vs-row>
                   <vs-row style="padding-top: 20px">
                       <vs-col vs-w="8">
                           <div class="form-group ">
                               <div class="c-label">Client Nº</div>
                               <v-select
                                   v-model="selectedClient"
                                   label="name"
                                   :options="clients"
                               />
                           </div>
                       </vs-col>
                   </vs-row>
                   <vs-row style="padding-top: 20px">
                        <vs-col vs-w="6">
                            <div class="form-group ">
                                <vs-textarea label="Observación externa" v-model="headSale.commentExt" />

                            </div>
                        </vs-col>
                        <vs-col vs-w="6">
                            <div class="form-group ">
                                <vs-textarea label="Observación interna" v-model="headSale.commentInt" />
                            </div>
                        </vs-col>
                    </vs-row>
                    <vs-row style="padding-top: 20px">
                        <vs-col vs-w="6">
                            <vs-button style="width: 100%" icon="save" color="success" type="filled" @click="submitFormat">Guardar</vs-button>
                        </vs-col>

                    </vs-row>

                </vx-card>
            </div>
        </vs-col>
    </vs-row>


</template>

<script>
import API from '../../api'
import vSelect from 'vue-select'

export default {
  components:{
    vSelect
  },
  name: 'NewSale',
  data () {
    return {
      searchValue:'',
      selected: { title: 'Producto' },
      option: [{ title: 'Producto' }, { title: 'Paquete' }],
      optionTicket: [{ title: 'Factura' }, { title: 'Boleta' }, { title: 'Ticket' }],
      optionSerie: [{ title: '001' }, { title: '002' }, { title: '003' }],
      input2:'',
      productsFilter: [],
      products:[],
      saleDetail:[],
      totalSale:null,
      viewHeadSale: false,
      headSale:{
        dateSale:'2020-12-12',
        numClient:null,
        typeSale:{title:null},
        serie:{title:null},
        numNota:null,
        clientInfo:'',
        commentExt:'',
        commentInt:''
      },
      textarea: null,
      clients:[],
      selectedClient: null

    }
  },
  async created () {
    this.$vs.loading()
    await this.getProducts()
    this.getClients()
  },
  methods: {

    /* API ACCESS*/
    async getClients () {
      const result = await API.request('client/all', 'GET')
      this.clients = result.data

    },
    async getProducts () {
      const result = await API.request('product/all', 'GET')
      this.productsFilter = result.data
      this.products = result.data
      this.$vs.loading.close()
    },
    async sendForm () {
      const data = {
        headSale: this.headSale,
        saleDetail: this.saleDetail,
        client: this.selectedClient
      }
      const result = await API.request('sale/store', 'POST', data)
      if (result.error)
        console.log(result)
    },


    /* DOM functions */
    filterProduct () {
      if (this.searchValue.trim() === '') {
        this.productsFilter = this.products
      } else {
        const filterValue = this.searchValue.toLowerCase()
        this.productsFilter = this.products.filter(item => item.Producto.toLowerCase().includes(filterValue))
      }
    },
    addProduct (IDProducto) {
      const product = this.productsFilter.find(item => item.IDProducto == IDProducto)
      const pos = this.saleDetail.findIndex(i => i.IDProducto === product.IDProducto)
      const currentSaleDetail = this.saleDetail
      if (pos != -1) {
        //existe
        currentSaleDetail[pos].cant++
      } else {
        //no existe
        product.cant = 1
        currentSaleDetail.push(product)
      }
      this.saleDetail = currentSaleDetail
      this.calcSale()
    },
    removeProduct (IDProducto) {
      const product = this.productsFilter.find(item => item.IDProducto == IDProducto)
      const currentSaleDetail = this.saleDetail
      const pos = this.saleDetail.findIndex(i => i.IDProducto === product.IDProducto)
      const currentProduct = this.saleDetail[pos]
      if (currentProduct.cant <= 1) {
        currentSaleDetail.splice(pos, 1)
      } else {
        currentSaleDetail[pos].cant--
      }

      this.saleDetail = currentSaleDetail
      this.calcSale()
    },
    calcSale () {
      const vue = this
      let calcElement = 0

      this.saleDetail.forEach(function (element, index) {
        calcElement += (element.PVenta * element.cant)
      })
      vue.totalSale = calcElement
    },
    showHeadSale () {
      this.viewHeadSale = !this.viewHeadSale
    },
    submitFormat () {
      if (this.validateForm()) {
        const data = {
          head : this.headSale,
          detail: this.saleDetail
        }
        this.sendForm()
      } else {
        alert('Faltan datos por llenar')
      }
    },

    validateForm () {
      console.log('here')
      const e = this.headSale
      if (!this.selectedClient) return 0
      if (!e.typeSale) return 0
      if (!e.serie) return 0
      if (!e.dateSale) return 0

      return 1
    }
  }
}
</script>

<style lang="scss">

    .list-detail{
        padding: 0 5px;
        li{
            margin-top: 10px;
        }
    }

    .content-group-btn{
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: center;
        .btn-add{
            border: 1px solid #636b6f;
            border-radius: 50%;
            width: 15px;
            height: 15px;
            text-align: center;
            font-size: 9px;
            font-weight: bold;
            cursor: pointer;
            &:hover{
                background-color: #c1bfbf;
                border-color: #bfbfbf;
                color: #fff;
            }
        }
        .result{
            margin: 10px;
        }
    }

    .content-form{
        .c-select{
            max-width: 140px !important;
            .c-label{
                padding-bottom: 5px;
            }

        }

    }

    .form-group{
        padding-right: 15px;
        .vs-con-input{
            padding-right: 15px;
            input{
                max-height: 37px;
            }
        }
    }

    .c-input{
        border: 1px solid rgba(0, 0, 0, 0.2);
        height: 37px;
        border-radius: 5px;
        box-shadow: 0 0 0 0 rgb(0 0 0 / 15%);
        padding: 5px;
        color: inherit;
        width: 100%;
    }


</style>
