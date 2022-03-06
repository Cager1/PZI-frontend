<template>
  <v-row>
    <v-col cols="12" style="padding: 0">
      <v-carousel hide-delimiters height="600px" cycle>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        ><h1 style="margin: 100px; color: white">{{item.text}}</h1></v-carousel-item>
      </v-carousel>
    </v-col>

    <v-col cols="12" class="text-center" style="padding-top: 100px; padding-bottom: 100px; color: whitesmoke;
     background-color: #3f51b5 !important;">
      <h2>Pogledajte ponude naših ovlaštenih servisera</h2>
      <nuxt-link to="/jobs" style="text-decoration: none">
        <v-btn color="white" text outlined x-large style="margin-top: 50px; border-color: white;">Kreni</v-btn>
      </nuxt-link>

    </v-col>
    <v-divider></v-divider>
    <v-col cols="12" style="padding-top: 100px; padding-bottom: 100px; background-color: white">
      <v-row
        justify="center"
        align="center">
        <v-spacer></v-spacer>
        <v-col cols="8" md="7">
          <h1>Vizija</h1>
          <p>Stranica za zakazivanje informacije o obrtu ili servisu, zakazivanje termina,
            kontaktiranje servisa, itd...</p>

          <a href="https://docs.google.com/document/d/1Q83PZCTO1cbsOZgUcWTiNwagCQcYZ4Gv/edit" target="_blank" >Vizija</a>
        </v-col>
        <v-col md="3">
          <v-icon
            x-large
            color="orange"
          >
            fa-lightbulb-o
          </v-icon>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        align="center">
        <v-spacer></v-spacer>
        <v-col cols="8" md="7">
          <h1>Opis</h1>
          <p>Stranica bi trebala imati funkcionalnosti dodavanja fotografija,
            slanja upita, kalendar i odabir termina</p>
        </v-col>
        <v-col sm="3">
          <v-icon
            x-large
            color="red"
          >
            fa-book
          </v-icon>
        </v-col>
      </v-row>

      <v-row justify="center"
             align="center"
      >
        <v-spacer></v-spacer>
        <v-col cols="8" md="7">
          <h1>Motivacija</h1>
          <p>Olakšavanja komunikacije, te jednostavnije dobivanje određenih informacija i zakazivanje termina za
            neki oblik servisa ili usluge.
            Cilj je olakšati komunikaciju servisera ili obrtnika sa potencijalnim klijentima.
            Također bi imala mogućnost objavljivanja fotografija u svrhu reklamiranja.</p>
        </v-col>
        <v-col sm="3">
          <v-icon
            x-large
            color="blue"
          >
            fa-line-chart
          </v-icon>
        </v-col>
      </v-row>
      <v-row justify="center"
             align="center"
             style="margin-top: 50px"
      >
        <v-spacer></v-spacer>
        <v-col cols="10" md="10">
          <h1>Dijagram</h1>
          <v-img :src="require('~/assets/diagram.jpeg')" />
        </v-col>
        <v-col sm="1">
        </v-col>
      </v-row>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12" style="padding-bottom: 50px; padding-top: 100px; background-color: lightcyan">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="10"><h1>Tehnologije</h1></v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="10">
          <ul style="font-size: 14pt">
            <li>Vue</li>
            <li>Vuetify</li>
            <li>Nuxt</li>
            <li>Laravel</li>

          </ul>
        </v-col>

      </v-row>
      <v-row align="center"
             justify="center"
      >
        <v-spacer></v-spacer>
        <v-col
          v-for="(tech,i) in technologies"
          :key="i"
          cols="6" md="2"
        >
          <v-img :src="tech.src" width="150px" />
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>
    <v-col cols="12" style="margin-bottom: 100px; margin-top: 150px;">
      <v-row
        align="center"
        justify="center"
      class="text-center">
        <v-col>
          <h1>NAŠ TIM</h1>
          <h2 style="margin-top: 20px;">Upoznajte naše članove koji rade na projektu</h2>
        </v-col>
      </v-row>
      <v-row style="margin-top: 50px;" align="center"
             justify="center"
      >
        <v-spacer></v-spacer>
        <v-col
          v-for="(member,i) in members"
          :key="i"
          cols="3"
          class="text-center"
        >
          <v-img class="mx-auto" :src="member.src" width="55%"  style="border-radius: 50%"/>
          <p>{{member.text}}</p>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-col>
  </v-row>


</template>

<script>
export default {
  name: 'IndexPage',
  auth: false,

  data: () => ({
    items: [
      {
        src: require('~/assets/slika1.jpg'),
        text: "Ugradnja grijanja po najpovoljnijim cijenama",
      },
      {
        src: require('~/assets/slika2.jpg'),
        text: "Servis i instalacija električnih energenata",
      },
      {
        src: require('~/assets/slika3.jpg'),
        text: "Odčepljavanje cijevi nikada nije bilo lakše",
      },
    ],

    technologies: [
      {
        src: require('~/assets/vue.png'),
      },
      {
        src: require('~/assets/laravel.png'),
      },
      {
        src: require('~/assets/vuetify.svg'),
      },
      {
        src: require('~/assets/nuxt.png'),
      }
    ],
    members: [
      {
        src: require('~/assets/ivan.jpeg'),
        text: '22, Ivan Kovač, Crypto Kostelić'
      },
      {
        src: require('~/assets/filip.jpeg'),
        text: '23, Filip Crnogorac, Prosječni Posušak "Krvi ti pajdo"',
      },
      {
        src: require('~/assets/ante.jpeg'),
        text: '22, Ljubuški, Average Majnkraft enjoyer'
      },
    ],
  }),

  methods: {

  },
}
</script>
