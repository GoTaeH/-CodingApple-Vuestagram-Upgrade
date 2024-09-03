<template>
  <div style="padding : 10px">
    <h4>팔로워</h4>
    <input @change="search($event.target.value)" placeholder="🔍" />
    <div class="post-header" v-for="(a, i) in follower" :key="i">
      <div class="profile" :style="`background-image : url(${a.image})`"></div>
      <span class="profile-name">{{ a.name }}</span>
    </div>
  </div>
  </template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';

export default {
  name : 'myPage',
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
  }
}
</script>

<style>

</style>