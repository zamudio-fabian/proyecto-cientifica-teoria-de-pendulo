<script>
import Vue from "vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { BContainer, BRow, BCol, BButton, BButtonGroup } from "bootstrap-vue";

export default {
  name: "CientificaModule", // vue component name
  components: { BContainer, BRow, BCol, BButton, BButtonGroup },

  data() {
    return {
      canvas: null,
      context: null,

      timeList: [],
      timeStart: null,
      timeEnd: null,

      Angle: -90,
      Length_m: 1,
      timeStep_ms: 10,

      runExperience: null
    };
  },

  mounted() {
    this.initPendulum();
  },

  methods: {
    PendulumSim: function(
      length_m,
      gravity_mps2,
      initialAngle_rad,
      timestep_ms,
      dumping,
      callback
    ) {
      var velocity = 0;
      this.Angle = initialAngle_rad;
      var k = -gravity_mps2 / length_m;
      var timestep_s = timestep_ms / 1000;
      this.runExperience = setInterval(() => {
        var acceleration = k * Math.sin(this.Angle) - dumping * velocity;
        velocity += acceleration * timestep_s;
        this.Angle += velocity * timestep_s;
        callback(this.Angle);
      }, timestep_ms);
    },

    countTime: function() {
      this.timeEnd = new Date().getTime();
      this.timeList.push(this.timeEnd - this.timeStart);

      this.stopExperience();
    },

    stopExperience: function() {
      clearInterval(this.runExperience);
    },

    refreshExperience: function() {
      clearInterval(this.runExperience);
      this.initPendulum();
    },

    initPendulum: function() {
      this.timeStart = new Date().getTime();

      this.canvas = this.$refs["canvas"];
      this.context = this.canvas.getContext("2d");
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var prev = 0;

      var sim = this.PendulumSim(
        this.Length_m,
        9.80665,
        this.Angle,
        this.timeStep_ms,
        0.1,
        angle => {
          var rPend = Math.min(this.canvas.width, this.canvas.height) * 0.47;
          var rBall = Math.min(this.canvas.width, this.canvas.height) * 0.02;
          var rBar = Math.min(this.canvas.width, this.canvas.height) * 0.005;
          //var ballX = Math.sin(angle) * rPend;
          //var ballY = Math.cos(angle) * rPend;

          this.context.fillStyle = "rgba(255,255,255,0.51)";
          this.context.globalCompositeOperation = "destination-out";
          this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

          this.context.fillStyle = "yellow";
          this.context.strokeStyle =
            "rgba(0,0,0," + Math.max(0, 1 - Math.abs(prev - angle) * 10) + ")";
          this.context.globalCompositeOperation = "source-over";

          this.context.save();
          this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
          this.context.rotate(angle);

          this.context.beginPath();
          this.context.rect(-rBar, -rBar, rBar * 2, rPend + rBar * 2);
          this.context.fill();
          this.context.stroke();

          this.context.beginPath();
          this.context.arc(0, rPend, rBall, 0, Math.PI * 2, false);
          this.context.fill();
          this.context.stroke();
          this.context.restore();
          prev = angle;
        }
      );
    }
  }
};
</script>

<template>
  <b-container style="margin-top: 30px;">
    <b-row class="justify-content-md-center">
      <b-col col lg="3">
        <b-container>
          <h6>Datos:</h6>
          <span>
            <strong>Angulo:</strong>
            {{this.Angle}} r
          </span>
          <span>
            <strong>Longitud:</strong>
            {{this.Length_m}} m
          </span>
        </b-container>
      </b-col>
      <b-col col lg="6">
        <b-container>
          <b-col col lg="12" class="justify-content-md-center">
            <canvas ref="canvas" width="470"></canvas>
          </b-col>
          <b-col col lg="12" class="justify-content-md-center" style="text-align: center;">
            <b-button-group>
              <b-button variant="primary" @click="stopExperience">Detener Experiencia</b-button>
              <b-button variant="primary" @click="refreshExperience">Reiniciar Experiencia</b-button>
            </b-button-group>
          </b-col>
        </b-container>
      </b-col>
      <b-col col lg="3">
        <b-container>
          <b-col col lg="12" class="justify-content-md-center">
            <b-button block variant="primary" @click="countTime">Contar Tiempo</b-button>
          </b-col>
          <b-col col lg="12" class="justify-content-md-center">
            <ul id="example-1">
              <li v-for="item in timeList">{{ item / 1000 }} segundos</li>
            </ul>
          </b-col>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<style>
canvas {
  border-radius: 16px 16px 16px 16px;
  -moz-border-radius: 16px 16px 16px 16px;
  -webkit-border-radius: 16px 16px 16px 16px;
  border: 1px double #000000;
}
</style>

