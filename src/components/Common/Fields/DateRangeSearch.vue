<template>
  <div>
    <v-text-field
      class="mouse"
      v-model="dateRangeText"
      no-title
      :label="description"
      :prepend-inner-icon="defaultIcon"
      readonly
      :outlined="outlined"
      :solo="solo"
      dense
      @click.stop="showDatePiker"
      :clearable="clearable"
      @click:clear="clearDate"
      :error="error"
      :disabled="!checkboxEnabled"
      hide-details="auto"
      color="orange darken-2"
    >
      <template slot="prepend" v-if="prependIcon">
        <v-icon color="orange darken-2">mdi-calendar-range</v-icon>
      </template>
      <template slot="append" v-if="showCheckbox">
        <v-checkbox
          dense
          hide-details
          v-model="checkboxEnabled"
        ></v-checkbox>
      </template>
    </v-text-field>
    <v-dialog v-model="dialog" :max-width="width.w" persistent>
      <v-card>
        <v-divider></v-divider>
        <v-card-text class="pt-5 mt-5 mb-5 pb-0">
          <v-row>
            <v-col cols="12" sm="12" md="12" :lg="width.x" style="padding: 0">
              <v-list dense>
                <v-list-item-group v-model="item" color="orange darken-2">
                  <v-list-item
                    v-for="(it, index) in items"
                    :key="index"
                    @click="setRangeDate(it)"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{
                        it.text
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="12" sm="12" md="12" :lg="width.y" style="padding: 0">
              <v-row>
                <v-col :lg="width.d" style="padding: 0">
                  <v-date-picker
                    v-model="range"
                    @update:picker-date="updatePickerL"
                    reactive
                    :range="!single"
                    no-title
                    scrollable
                    :picker-date.sync="pickerL"
                    full-width
                    color="orange darken-2"
                  >
                  </v-date-picker>
                </v-col>
                <v-col v-if="!single" :lg="width.d" style="padding: 0">
                  <v-date-picker
                    v-model="range"
                    @update:picker-date="updatePickerR"
                    reactive
                    no-title
                    range
                    scrollable
                    full-width
                    :picker-date.sync="pickerR"
                    color="orange darken-2"
                  ></v-date-picker>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-btn text color="orange darken-2" @click="dialog = false">Cancelar</v-btn>
          <v-btn text color="orange darken-2" @click="emitRangeInDate">Aplicar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {formatDate} from "@/utils/helpers";
export default {
  mixins: [formatDate],
  name: "DateRangeSearch",
  props: {
    description: {
      type: String,
      default: "BUSCAR ENTRE RANGO DE FECHAS",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    single: {
      type: Boolean,
      default: false,
    },
    presets: {
      type: Array,
      default: () => [],
    },
    many: {
      type: Boolean,
      default: false,
    },
    detailsOff: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
    prependIcon: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    solo:{
      type: Boolean,
      default: false,
    },
    defaultIcon: {
      type: String,
      default: "mdi-calendar-range",
    },
    error: {
      type: Boolean,
      default: false,
    },
    showCheckbox:{
      type: Boolean,
      default: false,
    },
    enabled:{
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      vertical: true,
      dialog: false,
      dates: "",
      item: 0,
      items: [],
      pickerL: moment().format("YYYY-MM-DD"),
      pickerR: moment().add(1, "months").format("YYYY-MM-DD"),
      range: "",
      checkboxEnabled: this.enabled
    };
  },
  mounted() {
    // this.setPresets();
  },
   watch: { 
    checkboxEnabled(){
      this.$emit('enabledChanged', this.checkboxEnabled);
    },
    value: {
      immediate: true,
      handler: function(value){
          if (Array.isArray(value)) {
          if (value !== this.dates) {
            this.dates = value;
          }
        } else {
          if (value != null) {
              this.dates = [value]
          }  else {
                this.dates = "";
          }
        }
        this.setPresets()
      }
    },
  },
  methods: {
    setPresets() {
      if (this.value != null && this.value.length > 0) {
        this.pickerL = moment(this.value[0]).format("YYYY-MM-DD");
        this.pickerR = moment(this.value[1])
          .add(1, "months")
          .format("YYYY-MM-DD");
      } else {
        this.pickerL = moment().format("YYYY-MM-DD");
        this.pickerR = moment().add(1, "months").format("YYYY-MM-DD");
      }

      if (this.single) {
        this.range =
          this.value != null && this.value.length > 0
            ? moment(this.value[0]).format("YYYY-MM-DD")
            : moment().format("YYYY-MM-DD");

        this.items = [
          {
            text: "Hoy",
            range: moment().format("YYYY-MM-DD"),
          },
          {
            text: "Mañana",
            range: moment().add(1, "days").format("YYYY-MM-DD"),
          },
          {
            text: "Siguiente semana",
            range: moment()
              .add(1, "weeks")
              .startOf("isoWeek")
              .format("YYYY-MM-DD"),
          },
          {
            text: "Siguiente mes",
            range: moment()
              .add(1, "month")
              .startOf("month")
              .format("YYYY-MM-DD"),
          },
        ];
      } else {
        this.range =
          this.value != null && this.value.length > 0
            ? [
                moment(this.value[0]).format("YYYY-MM-DD"),
                moment(this.value[1]).format("YYYY-MM-DD"),
              ]
            : [moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD")];

        this.items = [
          {
            text: "Hoy",
            range: [
              moment().format("YYYY-MM-DD"),
              moment().format("YYYY-MM-DD"),
            ],
          },
          {
            text: "Ayer",
            range: [
              moment().subtract(1, "days").format("YYYY-MM-DD"),
              moment().subtract(1, "days").format("YYYY-MM-DD"),
            ],
          },
          {
            text: "Los pasados 7 días",
            range: [
              moment().subtract(6, "days").format("YYYY-MM-DD"),
              moment().format("YYYY-MM-DD"),
            ],
          },
          {
            text: "Los pasados 14 días",
            range: [
              moment().subtract(13, "days").format("YYYY-MM-DD"),
              moment().format("YYYY-MM-DD"),
            ],
          },
          {
            text: "Esta semana",
            range: [
              moment().clone().weekday(1).format("YYYY-MM-DD"),
              moment().clone().weekday(5).format("YYYY-MM-DD"),
            ],
          },
          {
            text: "La semana pasada",
            range: [
              moment()
                .subtract(1, "weeks")
                .startOf("week")
                .format("YYYY-MM-DD"),
              moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"),
            ],
          },
          {
            text: "Los pasados 30 días",
            range: [
              moment().subtract(29, "days").format("YYYY-MM-DD"),
              moment().format("YYYY-MM-DD"),
            ],
          },
          {
            text: "Este mes",
            range: [
              moment().startOf("month").format("YYYY-MM-DD"),
              moment().endOf("month").format("YYYY-MM-DD"),
            ],
          },
          {
            text: "Este año",
            range: [
              moment().startOf("year").format("YYYY-MM-DD"),
              moment().endOf("year").format("YYYY-MM-DD"),
            ],
          },
        ];
      }
      this.items =
        this.presets.length > 0 ? this.items.concat(this.presets) : this.items;
    },
    updatePickerL(val) {
      if (!this.single) {
        let dateStart = moment(this.range[0]);
        let dateEnd = moment(this.range[1]);
        let duration = moment.duration(dateEnd.diff(dateStart));
        let days = duration.asDays();
        this.pickerR =
          days > 31
            ? moment(this.range[1]).format("YYYY-MM-DD")
            : moment(val).add(1, "months").format("YYYY-MM-DD");
      }
    },
    updatePickerR(val) {
      let dateStart = moment(this.range[0]);
      let dateEnd = moment(this.range[1]);
      let duration = moment.duration(dateEnd.diff(dateStart));
      let days = duration.asDays();
      this.pickerL =
        days > 31
          ? moment(this.range[0]).format("YYYY-MM-DD")
          : moment(val).add(-1, "months").format("YYYY-MM-DD");
    },
    clearDate() {
      this.dates = "";
      this.$emit("input", []);
    },
    showDatePiker() {
      this.item = this.value != null && this.value.length > 0 ? -1 : 0;
      this.dialog = true;
    },
    setRangeDate(item) {
      this.range = item.range;
      this.pickerL = !this.single ? item.range[0] : item.range;
    },
    emitRangeInDate() {
      this.dates = this.range;
      if (!this.single) {
        if (this.dates.length < 2) {
          this.dates.push(this.range[0]);
        }
        let dateStart = this.dates[0];
        let dateEnd = this.dates[1];
        if (new Date(this.dates[0]) > new Date(this.dates[1])) {
          this.dates[0] = dateEnd;
          this.dates[1] = dateStart;
        }
      }
      this.$emit("update", this.dates);
      this.$emit("input", this.range);
      this.dialog = false;
    },
    getFilterFormat(){
        if(!this.value){
          return;
        }

        if(this.value[0] == null){
          return;
        }
        return this.range;
    },
    setFromFilter(range) {
        this.clearDate();
        this.range = range;
        this.$emit("input", range);
    },
    clear(){
      this.clearDate();
    }
  },
  computed: {
    dateRangeText: {
      get() {
        if (this.dates !== "" && !this.single) {
          let dataFormat = this.dates.map((it) =>
            this.formatDate(it)
          );
          return dataFormat.join(" - ");
        } else {
            return this.formatDate(this.dates[0]); 
        }
      },
      set(newRange) {
        return newRange;
      },
    },
    width() {
      return !this.single
        ? this.vertical
          ? { w: "800", d: "6", x: 3, y: 9 }
          : { w: "500", d: "12", x: 4, y: 8 }
        : { w: "500", d: "12", x: 4, y: 8 };
    },
  },
};
</script>

<style scoped>
.v-card__actions {
  align-items: center;
  display: flex;
  padding: 0 10px 0 10px;
}
.mouse :hover {
  cursor: pointer;
}
</style>
