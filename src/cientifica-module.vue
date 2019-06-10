<script>
import Vue from "vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import numeral from "numeral";

import { BContainer, BRow, BCol, BButton, BButtonGroup } from "bootstrap-vue";

const STATE_RUN = 1;
const STATE_STOP = 0;

export default {
  name: "CientificaModule", // vue component name
  components: {
    BContainer,
    BRow,
    BCol,
    BButton,
    BButtonGroup
  },

  data() {
    return {
      canvas: null,
      context: null,

      timeList: [],
      timeStart: 0,
      timeEnd: 0,
      currentTime: 0,
      currentTimeLoop: null,

      initialAngle_r: -90,
      initialLength_m: 1,
      initialTimeStep_ms: 10,

      Angle: -90,
      Length_m: 1,
      timeStep_ms: 10,

      runExperience: null,

      state: STATE_STOP
    };
  },

  mounted() {},

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
      this.state = STATE_STOP;
    },

    runTime: function() {
      if (this.currentTimeLoop == null) {
        this.currentTimeLoop = setInterval(() => {
          this.currentTime = this.currentTime + 1;
        }, 1);
      } else {
        this.stopTime();
      }
    },

    stopTime: function() {
      clearInterval(this.currentTimeLoop);
      this.currentTimeLoop = null;
      this.currentTime = 0;
    },

    stopExperience: function() {
      clearInterval(this.runExperience);
    },

    initPendulum: function() {
      this.timeStart = new Date().getTime();

      this.state = STATE_RUN;

      this.canvas = this.$refs["canvas"];
      this.context = this.canvas.getContext("2d");
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      var prev = 0;

      var sim = this.PendulumSim(
        this.initialLength_m,
        9.80665,
        this.initialAngle_r,
        this.initialTimeStep_ms,
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
    },

    buttonAction: function() {
      if (this.state == STATE_RUN) {
        this.countTime();
        this.stopTime();
      } else {
        this.initPendulum();
        this.runTime();
      }
    }
  },

  filters: {
    time: function(value) {
      value = value.toString();
      return numeral(value).format("00:00:00");
    }
  }
};
</script>

<template>
  <b-container class="mt-5">
    <b-row class>
      <b-col col lg="2">
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
      <b-col col lg="5">
        <b-container>
          <b-col col lg="12" class="justify-content-md-center">
            <canvas ref="canvas" width="470"></canvas>
          </b-col>
          <b-col col lg="12">
            <p>
              <strong>Pruebas</strong>
            </p>
            <ul id="example-1">
              <li v-for="(item, index) in timeList">
                <strong>Caso #{{index + 1}}</strong>
                - {{ item | time }} minutos
              </li>
            </ul>
          </b-col>
        </b-container>
      </b-col>
      <b-col col lg="5">
        <b-container>
          <b-col col lg="12" class="justify-content-md-center">
            <b-container>
              <b-col col lg="12" class="text-center mb-2">
                <span id="time">{{ this.currentTime | time}} min</span>
              </b-col>
              <b-col col lg="12" class="mb-2">
                <b-button
                  block
                  variant="primary"
                  @click="buttonAction"
                >{{this.state == 0 ? "INICIAR" : "CONTAR TIEMPO"}}</b-button>
              </b-col>
              <b-col col lg="12" class="justify-content-md-center">
                <span>
                  <strong>Descripción:</strong>
                </span>
                <p>Un péndulo físico o péndulo compuesto es cualquier cuerpo rígido que pueda oscilar libremente en el campo gravitatorio alrededor de un eje horizontal fijo, que no pasa por su centro de masa.</p>
              </b-col>
            </b-container>
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

#time {
  font-size: 30px;
  font-weight: 400;
  color: grey;
}
</style>

