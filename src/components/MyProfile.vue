<template>
  <div style="padding : 10px">
    <h4>프로필 선택</h4>
    <div class="post-header" v-for="(a, i) in follower" :key="i" >
      <div @click="$store.commit('changeName', a.name), $store.commit('changeImg', a.image),
      event()">
        <div class="profile" :style="`background-image : url(${a.image})`"></div>
        <span class="profile-name" >{{ a.name }}</span>
      </div>
    </div>
  </div>
  </template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

export default {
  name : 'myProfile',
  setup() {
    let follower = ref([]);
    let followerOrigin = ref([]);

    onMounted(()=>{
      axios.get('/follower.json').then((a)=>{
        follower.value = a.data;
        followerOrigin.value = [...a.data];
      })
    });

    function search(word) {
      let searchFollower = followerOrigin.value.filter((a) => {
        return a.name.indexOf(word) != -1
      });
      follower.value = [...searchFollower]
    } 

    axios.get('/follower.json').then((a) => {
      follower.value = a.data
    })
    return {follower, search}
  },
  data() {
    return {
      word : '',
    }
  },
  methods : {
    event() {
      alert(`프로필이 ${this.$store.state.nickname}(으)로 변경됩니다.`)
    }
  }
}
</script>

<style>

</style>