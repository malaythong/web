<template>
  <v-row>
    <v-col>
      <div>
        <h3 class="d-flex justify-center ">ກະທູ້ທີ່ມີຄົນເຂົ້າອ່ານຫຼາຍທີ່ສຸດ</h3>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            
            <thead>
              
              <tr>
                <th class="text-left primary" style="color: #ffffff;">ລຳດັບ</th>
                <th class="text-left primary" style="color: #ffffff;">ຫົວຂໍ້</th>
                <th class="text-left primary" style="color: #ffffff;">ຈຳນວນການເຂົ້າອ່ານ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in reading" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.topic }}</td>
                <td>{{ item.readed }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-col>

    <v-col>
      <div>
        <h3 class="d-flex justify-center ">ກະທູ້ທີ່ຄະແນນຫຼາຍທີ່ສຸດ</h3>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left primary" style="color: #ffffff;">ລຳດັບ</th>
                <th class="text-left primary" style="color: #ffffff;">ຫົວຂໍ້</th>
                <th class="text-left primary" style="color: #ffffff;">ຈຳນວນຄະແນນ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in rating" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.topic }}</td>
                <td>{{ item.rating }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-col>

    <v-col>
      <div>
        <h3 class="d-flex justify-center ">ກະທູ້ທີ່ມີຄົນສະແດງຄວາມຄິດເຫັນຫຼາຍທີ່ສຸດ</h3>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left primary" style="color: #ffffff;">ລຳດັບ</th>
                <th class="text-left primary" style="color: #ffffff;">ຫົວຂໍ້</th>
                <th class="text-left primary" style="color: #ffffff;">ຈຳນວນຄວາມຄິດເຫັນ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in comment" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.topic }}</td>
                <td>{{ item.comment }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      reading: [
        {
          topic: 'ສິ່ງທີ່ຄວນຮູ້ກ່ອນຈະຕັດສິນໃຈເລືອກສາຍການຮຽນ',
          readed: 20,
        },
        {
          topic: 'ເຫດຜົນທີ່ຕ້ອງເລືອກລະຫວ່າງສາຍທີ່ຢາກຮຽນ ແລະສາຍຮຽນທີ່ພໍ່ແມ່ເລືອກໃຫ້',
          readed: 10,
        },
        {
          topic: 'ຈະເຮັດແນວໃດຕໍ່ຖ້າຮູ້ຕົວວ່າເລືອກສາຍຮຽນຜິດ',
          readed: 9,
        },
        {
          topic: 'ທາງເລືອກ ແລະ ຄຳແນະນຳສຳລັບນັກຮຽນທີ່ບໍ່ຮູ້ວ່າຈະຮຽນຫຍັງຕໍ່',
          readed: 9,
        },
        {
          topic: 'ຈົບ ມ7 ໄປບໍ່ຮູ້ຈະຮຽນສາຍໃດດີ ມີໃຜແນະນຳໃຫ້ໄດ້ແນ່?',
          readed: 6,
        },
        {
          topic: 'AI ຈະເຮັດວຽກແທນຄົນໄດ້ແທ້ບໍ?',
          readed: 6,
        },
        {
          topic: 'ວຽກທີ່ມັກ ກັບ ວຽກທີ່ໄດ້ຄ່າຕອບແທນຫຼາຍຄວນເລືອກອັນໃດດີ',
          readed: 5,
        },
        {
          topic: '10 ອາຊີບທີ່ເງິນເດືອນສູງທີ່ສຸດໃນລາວ',
          readed: 4,
        },
        {
          topic: 'ລະດັບເງິນເດືອນເລີ່ມຕົ້ນຂອງນັກສຶກສາຈົບໃໝ່ໃນລາວ',
          readed: 2,
        },
        {
          topic: 'ແນະນຳອາຊີບທີ່ສາມາດເຮັດຢູ່ບ້ານໄດ້ (Work From Home)',
          readed: 0,
        },
      ],
      rating: [
        {
          topic: 'ສິ່ງທີ່ຄວນຮູ້ກ່ອນຈະຕັດສິນໃຈເລືອກສາຍການຮຽນ',
          rating: 15,
        },
        {
          topic: 'ເຫດຜົນທີ່ຕ້ອງເລືອກລະຫວ່າງສາຍທີ່ຢາກຮຽນ ແລະສາຍຮຽນທີ່ພໍ່ແມ່ເລືອກໃຫ້',
          rating: 10,
        },
        {
          topic: 'ຈະເຮັດແນວໃດຕໍ່ຖ້າຮູ້ຕົວວ່າເລືອກສາຍຮຽນຜິດ',
          rating: 9,
        },
        {
          topic: 'ທາງເລືອກ ແລະ ຄຳແນະນຳສຳລັບນັກຮຽນທີ່ບໍ່ຮູ້ວ່າຈະຮຽນຫຍັງຕໍ່',
          rating: 7,
        },
        {
          topic: 'ຈົບ ມ7 ໄປບໍ່ຮູ້ຈະຮຽນສາຍໃດດີ ມີໃຜແນະນຳໃຫ້ໄດ້ແນ່?',
          rating: 8,       
         },
        {
          topic: 'AI ຈະເຮັດວຽກແທນຄົນໄດ້ແທ້ບໍ?',
          rating: 6,
        },
        {
          topic: 'ວຽກທີ່ມັກ ກັບ ວຽກທີ່ໄດ້ຄ່າຕອບແທນຫຼາຍຄວນເລືອກອັນໃດດີ',
          rating: 5,
        },
        {
          topic: '10 ອາຊີບທີ່ເງິນເດືອນສູງທີ່ສຸດໃນລາວ',
          rating: 4,
        },
        {
          topic: 'ລະດັບເງິນເດືອນເລີ່ມຕົ້ນຂອງນັກສຶກສາຈົບໃໝ່ໃນລາວ',
          rating: 2,
        },
        {
          topic: 'ແນະນຳອາຊີບທີ່ສາມາດເຮັດຢູ່ບ້ານໄດ້ (Work From Home)',
          rating: 0,
        },
      ],
      comment: [
        {
          topic: 'ສິ່ງທີ່ຄວນຮູ້ກ່ອນຈະຕັດສິນໃຈເລືອກສາຍການຮຽນ',
          comment: 5,
        },
        {
          topic: 'ເຫດຜົນທີ່ຕ້ອງເລືອກລະຫວ່າງສາຍທີ່ຢາກຮຽນ ແລະສາຍຮຽນທີ່ພໍ່ແມ່ເລືອກໃຫ້',
          comment: 5,
        },
        {
          topic: 'ຈະເຮັດແນວໃດຕໍ່ຖ້າຮູ້ຕົວວ່າເລືອກສາຍຮຽນຜິດ',
          comment: 4,
        },
        {
          topic: 'ທາງເລືອກ ແລະ ຄຳແນະນຳສຳລັບນັກຮຽນທີ່ບໍ່ຮູ້ວ່າຈະຮຽນຫຍັງຕໍ່',
          comment: 2,
        },
        {
          topic: 'ຈົບ ມ7 ໄປບໍ່ຮູ້ຈະຮຽນສາຍໃດດີ ມີໃຜແນະນຳໃຫ້ໄດ້ແນ່?',
          comment: 1,       
         },
        {
          topic: 'AI ຈະເຮັດວຽກແທນຄົນໄດ້ແທ້ບໍ?',
          comment: 0,
        },
        {
          topic: 'ວຽກທີ່ມັກ ກັບ ວຽກທີ່ໄດ້ຄ່າຕອບແທນຫຼາຍຄວນເລືອກອັນໃດດີ',
          comment: 0,
        },
        {
          topic: '10 ອາຊີບທີ່ເງິນເດືອນສູງທີ່ສຸດໃນລາວ',
          comment: 0,
        },
        {
          topic: 'ລະດັບເງິນເດືອນເລີ່ມຕົ້ນຂອງນັກສຶກສາຈົບໃໝ່ໃນລາວ',
          comment: 0,
        },
        {
          topic: 'ແນະນຳອາຊີບທີ່ສາມາດເຮັດຢູ່ບ້ານໄດ້ (Work From Home)',
          comment: 0,
        },
      ],
    }
  },
}
</script>

<style>

</style>