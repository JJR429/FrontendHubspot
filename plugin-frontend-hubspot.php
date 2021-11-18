<?php
/**
 * Plugin Name:       Frontend Hubspot
 * Plugin URI:        https://github.com/JJR429/FrontendHubspot
 * Description:       Plugin form to request a demo of Brithwheel using Hubspot's API
 * Version:           1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            JJR429
 * Author URI:        https://github.com/JJR429/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       frontend-hubspot
*/


function func_load_vuescripts() {
    wp_register_script('wpvue_vuejs', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
    wp_register_script('vue_axios', 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js');
    wp_register_script('vue_codejs', plugin_dir_url( __FILE__ ).'includes/vuecode.js', 'wpvue_vuejs', true );
   }
add_action('wp_enqueue_scripts', 'func_load_vuescripts');

function form_hub_demo(){
    //Add Vue.js
  wp_enqueue_script('wpvue_vuejs');
  //Add Axios
  wp_enqueue_script('vue_axios');
    //VueJs to handdle Form
  wp_enqueue_script('vue_codejs');
  //form
    $response = '<form id="app" v-on:submit.prevent>
    <div class="form">
    <div class="row-flex">
        <input type="text" placeholder="First name*" name="firstname" v-model="fields.firstname" v-on:blur="clearMessages">
        <input type="text" placeholder="Last name*" name="lastname" v-model="fields.lastname" v-on:blur="clearMessages">
    </div>
    <div class="row-flex">
        <input type="email" placeholder="Email*" name="email" v-model="fields.email" v-on:blur="clearMessages">
    </div>
    <div class="row-flex">
        <input type="text" placeholder="Organization name*" name="company" v-model="fields.company" v-on:blur="clearMessages">
    </div>
    <div class="row-flex">
        <select class="selection" v-model="fields.enrollment_range__c" v-on:blur="clearMessages">
            <option disabled value="">Enrollment capacity*</option>
            <option value="1-19">1-19</option>
            <option value="20-99">20-99</option>
            <option value="100+">100+</option>
            <option value="Multi-Site">Multi-Site</option>
            <option value="Other">Other</option>
          </select>
    </div>
    <div class="row-flex">
        <input type="text" @input="acceptNumber" placeholder="Phone number*" name="phone" v-model="fields.phone" v-on:blur="clearMessages">
    </div>
    <div class="row">
        <span class="message-responde text-warning text-center" v-if="options.message != \'\'">{{options.message}}</span>
        <span class="message-responde text-danger text-center" v-if="options.error != \'\'">{{options.error}}</span>
        <span class="message-responde text-success text-center" v-if="options.success != \'\'">{{options.success}}</span>
       
    </div>
    <div class="row-flex">
        <button class="button-form" v-on:click="sendData()">Request Your Demo</button>
    </div>
</div>
</form>';
return $response;
}

add_shortcode("form_hub_demo","form_hub_demo");