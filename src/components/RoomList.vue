<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Room List
        <b-link href="#/add-room">(Add Room)</b-link>
      </h2>
      <b-table striped hover :items="rooms" :fields="fields">
        <!-- <template v-slot="actions" scope="row">
          <b-btn size="sm" @click.stop="join(row._id)">Join</b-btn>
        </template> -->
        <!-- A virtual column -->
        <template v-slot:cell(action)="data">
            <b-btn size="sm" @click.stop="join(data.item._id)">Join</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li :key="error.id" v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'BookList',
  data () {
    return {
      fields: [
        // A column that needs custom formatting
        { key: 'room_name', label: 'Room Name' },
        // A regular column
        { key: 'created_date', label: 'Created Date' },
        'action'
        // A regular column
        // A virtual column made up from two fields
      ],
      //   fields: {
      //     index: { label: 'Action' },
      //     room_name: { label: 'Room Name', sortable: true, 'class': 'text-center' },
      //     created_date: { label: 'Created Date', sortable: true }
      //   },
      rooms: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/room`)
      .then(response => {
        this.rooms = response.data
        return response
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    join (id) {
      this.$router.push({
        name: 'JoinRoom',
        params: { id: id }
      })
    }
  }
}
</script>
