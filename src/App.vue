<template>
  <div class="header">
    <ul class="header-button-left">
      <li v-if="step != 3" @click="step = 3">Follower</li>
      <li v-if="step == 3" @click="step = 0">Main</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 0" @click="step = 4">Profile</li>
      <li v-if="step == 4" @click="step = 0">Main</li>
      <li v-if="step == 1" @click="step++">Next</li>
      <li v-if="step == 2" @click="publish"  @write="publish">발행</li>
    </ul>
    <img src="./assets/logo.png" class="logo" @click="step = 0"/>
  </div>

  <!-- <p>{{ name }}</p> -->
  <ContainerComp :postdata="postdata" :step="step" :image="image" 
    @write="handleWrite" :checkfilter="checkfilter" />
  <!-- <p>{{ $store.state.more }}</p> -->
  <!-- <button @click="$store.dispatch('getData')">더보기</button> -->

  <div class="footer">
    <ul class="footer-button-plus">
      <input @change="upload" type="file" id="file" class="inputfile"/>
      <label for="file" class="input-plus">+</label>
    </ul>
 </div>
 <!-- <button @click="more">더보기</button> -->
 <!-- <h4>안녕 {{ $store.state.name }} {{ $store.state.age }}</h4>
 <button @click="$store.commit('changename')">버튼</button>
 <button @click="$store.commit('changeage',10)">버튼2</button> -->


 <!-- <div v-if="step == 0">내용0</div>
 <div v-if="step == 1">내용1</div>
 <div v-if="step == 2">내용2</div> -->
 <!-- <button @click="step = 0">버튼0</button>
 <button @click="step = 1">버튼1</button>
 <button @click="step = 2">버튼2</button> -->

 <!-- <p>{{ now2 }} {{ counter }}</p>
 <button @click="counter++">버튼</button> -->
</template>

<script>
import ContainerComp from './components/ContainerComp.vue';
import postdata from './assets/data.js'
import axios from 'axios'
import { mapState } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      step : 0,
      postdata : postdata,
      count : 0,
      image : '',
      nickname : '',
      postwrite : '',
      checkfilter : '',
      counter : 0,
      months : ["Jan", "Feb", "Mar", "Apr", "May", 
        "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    }
  },
  mounted() {
    this.emitter.on('apply', (a) => {
      this.checkfilter = a
    });
  },
  components: {
    ContainerComp,
  },
  computed : {
    // now2() {
    //   return new Date()
    // },
    name() {
      return this.$store.state.name
    },
    ...mapState(['name', 'age', 'likes']),
  },
  methods : {
    nowMonth() {
      let d = new Date()
      return d.getMonth()
    },
    nowDate() {
      let d = new Date()
      return d.getDate()
    },
    publish() {
      var myPost = {
        name: this.$store.state.nickname,
        userImage: this.$store.state.img,
        postImage: this.image,
        likes: this.$store.commit('addPost'),
        date: this.months[this.nowMonth()] + " " + this.nowDate(),
        liked: false,
        content: this.postwrite,
        filter: this.checkfilter
  
      };
      console.log(this.postwrite);
      this.postdata.unshift(myPost);
      this.step = 0;
      this.postwrite = '';
    },
    more() {
      axios.get(`https://codingapple1.github.io/vue/more${this.count}.json`)
      .then((result)=>{
        this.postdata.push(result.data);
        this.count++;
      })
    },
    upload(e) {
      let file = e.target.files;
      let url = URL.createObjectURL(file[0]);
      console.log(url);
      this.image = url;
      this.step++;
    },
    handleWrite(content) {
      this.postwrite = content;
    },
  },
}
</script>

<style>
@import 'style.css';
</style>
